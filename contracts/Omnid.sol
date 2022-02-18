/*===============================
                        _     _
                       (_)   | |
   ___  _ __ ___  _ __  _  __| |
  / _ \| '_ ` _ \| '_ \| |/ _` |
 | (_) | | | | | | | | | | (_| |
 \___/|_| |_| |_|_| |_|_|\__,_|

===============================*/

// SPDX-License-Identifier: AGPL-3.0
pragma solidity >=0.8.12 <0.9.0;

import "../node_modules/@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import '../node_modules/@rari-capital/solmate/src/tokens/ERC721.sol';
import '../node_modules/@openzeppelin/contracts/utils/Strings.sol';
import '../node_modules/@opengsn/contracts/src/BaseRelayRecipient.sol';

interface INftDescriptor {
    struct IdDetails {
        uint256 score;
        uint256 refreshTime;
        uint256 skinIndex;
        bytes32 etching;
    }
    function constructTokenURI(uint256 _tokenId, address _address, IdDetails calldata _deets) external view returns (string memory);
    function isValidSkinId(uint256 _skinId) external view returns(bool);
}

contract Omnid is ERC721, ChainlinkClient, KeeperCompatibleInterface, BaseRelayRecipient {

    using Strings for uint256;

    // Chainlink

    using Chainlink for Chainlink.Request;

    bytes32 private jobId;
    uint256 private fee;

    mapping(bytes32 => address) public requestIdToAddress;
    mapping(bytes32 => bool) public requestIdFulfilled;
    event RequestFulfilled(bytes32 indexed requestId, uint256 indexed score);

    uint public lastTimeStamp;
    uint256[] upkeepQueue;

    // OMNID

    uint256 public tokenCounter;
    address public admin;
    INftDescriptor public descriptor;
    string public base;

    mapping(address => INftDescriptor.IdDetails) public addressToIdDetails;
    mapping(address => bool) public hasMinted;

    event ScoreUpdated(address indexed who, uint256 indexed score);
    event SkinUpdated(address indexed who, uint256 indexed tokenId, uint256 skinId);
    event EtchingUpdated(address indexed who, uint256 indexed tokenId, bytes32 etching);

    constructor(address _descriptorAddress) ERC721("Omnid", "OMNID") {
        tokenCounter = 0;
        admin = msg.sender;
        descriptor = INftDescriptor(_descriptorAddress);
        base = "https://theconvo.space/api/identity?apikey=CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO&address=";
        lastTimeStamp = block.timestamp;

        uint256 chainId;
        assembly { chainId := chainid() }
        if (chainId == 80001){ // matic mumbai config
            setChainlinkOracle(0x0bDDCD124709aCBf9BB3F824EbC61C87019888bb);
            setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
            jobId = "2bb15c3f9cfc4336b95012872ff05092";
            fee = 0.01 * (10 ** 18); //  LINK
            _setTrustedForwarder(0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b);
        }

    }

    modifier onlyAdmin() {
        require(_msgSender() == admin, "Omnid:onlyAdmin");
        _;
    }

    function withdrawLink() public onlyAdmin {
        LinkTokenInterface _link = LinkTokenInterface(chainlinkTokenAddress());
        require(_link.transfer(admin, _link.balanceOf(address(this))), "Unable to transfer");
    }

    function updateDescriptor(address _descriptorAddress) public onlyAdmin {
        descriptor = INftDescriptor(_descriptorAddress);
    }

    function updateBase(string memory _base) public onlyAdmin {
        base = _base;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory uri) {
        address ownerAddress = ownerOf[_tokenId];
        INftDescriptor.IdDetails memory deets = addressToIdDetails[ownerAddress];
        uri = descriptor.constructTokenURI(_tokenId, ownerAddress, deets);
    }

    function checkUpkeep(bytes calldata /*checkData*/) external view override returns (bool upkeepNeeded, bytes memory /*performData*/) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > 60*60*8;
    }

    function performUpkeep(bytes calldata /* performData */) external override {

        lastTimeStamp = block.timestamp;
        for (uint256 index = 0; index < upkeepQueue.length; index++) {
            address ownerAddress = ownerOf[upkeepQueue[index]];
            INftDescriptor.IdDetails memory deets = addressToIdDetails[ownerAddress];
            if(block.timestamp - deets.refreshTime > 60*60*8){ // 8hrs
                refreshScore(upkeepQueue[index]);
            }
        }
    }

    function getScore(address _add) external view returns(uint256) {
        return addressToIdDetails[_add].score;
    }

    function getIdDetails(address _add) external view returns(uint256, uint256, uint256, bytes32) {
        INftDescriptor.IdDetails memory deets = addressToIdDetails[_add];
        return (deets.score, deets.refreshTime, deets.skinIndex, deets.etching);
    }

    function createId(address _for, bytes32 _etching, uint256 _skinIndex) external {
        require(hasMinted[_for] == true, "OMNID: ID already issued");
        require(descriptor.isValidSkinId(_skinIndex) == true, "OMNID: Invalid Skin");

        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        string memory reqApiAddress = string(abi.encodePacked(base,addressToString(_for)));

        request.add("get", reqApiAddress);

        string[] memory path = new string[](1);
        path[0] = "score";
        request.addStringArray("path", path);

        bytes32 requestId = sendChainlinkRequest(request, fee);
        requestIdToAddress[requestId] = _for;

        INftDescriptor.IdDetails memory newDeets = INftDescriptor.IdDetails( 0, 0, _skinIndex, _etching );
        addressToIdDetails[_for] = newDeets;

    }

    function fulfill(bytes32 _requestId, uint256 _score) public recordChainlinkFulfillment(_requestId) {
        require(requestIdFulfilled[_requestId] == false, "Omnid:Request already Fulfilled");
        emit RequestFulfilled(_requestId, _score);

        uint256 newItemId = tokenCounter;
        address _add = requestIdToAddress[_requestId];

        INftDescriptor.IdDetails memory newDeets = addressToIdDetails[_add];
        newDeets.score = _score;
        newDeets.refreshTime = block.timestamp;
        addressToIdDetails[_add] = newDeets;

        hasMinted[_add] = true;

        _safeMint(_add, newItemId);
        upkeepQueue.push(newItemId);
        tokenCounter += 1;
        emit ScoreUpdated(_add, _score);
    }

    function refreshScore(uint256 _tokenId) public {
        require(_tokenId < tokenCounter, "OMNID: Invalid _tokenId");
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillRefresh.selector);
        address tokenOwner = ownerOf[_tokenId];

        string memory reqApiAddress = string(abi.encodePacked(base, ownerOf[_tokenId]));

        request.add("get", reqApiAddress);

        string[] memory path = new string[](1);
        path[0] = "score";
        request.addStringArray("path", path);

        bytes32 requestId = sendChainlinkRequest(request, fee);
        requestIdToAddress[requestId] = tokenOwner;
    }

    function fulfillRefresh(bytes32 _requestId, uint256 _score) public recordChainlinkFulfillment(_requestId) {
        require(requestIdFulfilled[_requestId] == false, "Omnid:Request already Fulfilled");
        emit RequestFulfilled(_requestId, _score);
        address add = requestIdToAddress[_requestId];

        INftDescriptor.IdDetails memory newDeets = addressToIdDetails[add];
        newDeets.score = _score;
        newDeets.refreshTime = block.timestamp;
        addressToIdDetails[add] = newDeets;

        emit ScoreUpdated(add, _score);
    }

    function updateSkin(uint256 _tokenId, uint256 _newSkinId) public {
        address tokenOwner = ownerOf[_tokenId];
        require(tokenOwner == _msgSender(), "Omnid:Only owner can update Skin.");
        require(descriptor.isValidSkinId(_newSkinId) == true, "OMNID: Invalid Skin");

        INftDescriptor.IdDetails memory newDeets = addressToIdDetails[tokenOwner];
        newDeets.skinIndex = _newSkinId;
        addressToIdDetails[tokenOwner] = newDeets;

        emit SkinUpdated(tokenOwner, _tokenId, _newSkinId);
    }

    function updateEtching(uint256 _tokenId, bytes32 _newEtching) public {
        address tokenOwner = ownerOf[_tokenId];
        require(tokenOwner == _msgSender(), "Omnid:Only owner can update Etching.");

        INftDescriptor.IdDetails memory newDeets = addressToIdDetails[tokenOwner];
        newDeets.etching = _newEtching;
        addressToIdDetails[tokenOwner] = newDeets;

        emit EtchingUpdated(tokenOwner, _tokenId, _newEtching);
    }

    // Utils
    function addressToString(address _addr) internal pure returns (string memory) {
        uint256 value = uint256(uint160(_addr));
        bytes16 ALPHABET = '0123456789abcdef';
        bytes memory buffer = new bytes(2 * 20 + 2);
        buffer[0] = '0';
        buffer[1] = 'x';
        for (uint256 i = 2 * 20 + 1; i > 1; --i) {
            buffer[i] = ALPHABET[value & 0xf];
            value >>= 4;
        }
        return string(buffer);
    }
    function versionRecipient() external pure override returns (string memory) {
        return "1";
    }

    function setTrustedForwarder(address _trustedForwarder) external onlyAdmin {
        _setTrustedForwarder(_trustedForwarder);
    }

    // Only for Testing.
    function createIdDev(address _for, uint256 _score, bytes32 _etching, uint256 _skinIndex) external onlyAdmin {

        uint256 newItemId = tokenCounter;

        INftDescriptor.IdDetails memory newDeets = INftDescriptor.IdDetails( _score, block.timestamp, _skinIndex, _etching );
        addressToIdDetails[_for] = newDeets;

        _safeMint(_for, newItemId);
        tokenCounter += 1;
        emit ScoreUpdated(_for, _score);
    }

}

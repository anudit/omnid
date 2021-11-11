/*===============================
                        _     _
                       (_)   | |
   ___  _ __ ___  _ __  _  __| |
  / _ \| '_ ` _ \| '_ \| |/ _` |
 | (_) | | | | | | | | | | (_| |
 \___/|_| |_| |_|_| |_|_|\__,_|

===============================*/

// SPDX-License-Identifier: AGPL-3.0
pragma solidity >=0.8.9 <0.9.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/utils/Strings.sol';
import 'base64-sol/base64.sol';

interface INftDescriptor {
    struct IdDetails {
        uint256 score;
        uint256 refreshTime;
        uint256 skinIndex;
        string etching;
    }
    function constructTokenURI(uint256 _tokenId, IdDetails calldata _deets) external view returns (string memory);
    function isValidSkinId(uint256 _skinId) external view returns(bool);
}

contract Omnid is ERC721, ChainlinkClient {

    using Strings for uint256;

    // Chainlink

    using Chainlink for Chainlink.Request;

    bytes32 private jobId;
    uint256 private fee;

    mapping(bytes32 => address) public requestIdToAddress;
    mapping(bytes32 => bool) public requestIdFulfilled;
    event RequestFulfilled(bytes32 indexed requestId, uint256 indexed score);

    // OMNID

    uint256 public tokenCounter;
    address public admin;
    INftDescriptor public descriptor;

    mapping(address => INftDescriptor.IdDetails) public addressToIdDetails;
    mapping(address => bool) public hasMinted;

    event ScoreUpdated(address indexed who, uint256 indexed score);
    event SkinUpdated(address indexed who, uint256 indexed tokenId, uint256 skinId);
    event EtchingUpdated(address indexed who, uint256 indexed tokenId, string etching);

    constructor(address _descriptorAddress) ERC721("Omnid", "OMNID") {
        tokenCounter = 0;
        admin = msg.sender;
        descriptor = INftDescriptor(_descriptorAddress);

        uint256 chainId;
        assembly { chainId := chainid() }
        if (chainId == 80001){ // matic mumbai config
            setChainlinkOracle(0x0bDDCD124709aCBf9BB3F824EbC61C87019888bb);
            setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
            jobId = "2bb15c3f9cfc4336b95012872ff05092";
            fee = 0.01 * (10 ** 18); //  LINK
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Omnid:onlyAdmin");
        _;
    }

    function withdrawLink() public onlyAdmin {
        LinkTokenInterface _link = LinkTokenInterface(chainlinkTokenAddress());
        require(_link.transfer(msg.sender, _link.balanceOf(address(this))), "Unable to transfer");
    }

    function updateDescriptor(address _descriptorAddress) public onlyAdmin {
        descriptor = INftDescriptor(_descriptorAddress);
    }

    function totalSupply() external view returns (uint256) {
        return tokenCounter;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory uri) {
        address ownerAddress = ownerOf(_tokenId);
        INftDescriptor.IdDetails memory deets = addressToIdDetails[ownerAddress];
        uri = descriptor.constructTokenURI(_tokenId, deets);
    }

    function createId(address _for, string memory _etching, uint256 _skinIndex) external {
        require(hasMinted[_for] == true, "OMNID: ID already issued");
        require(descriptor.isValidSkinId(_skinIndex) == true, "OMNID: Invalid Skin");

        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        string memory reqApiAddress = string(abi.encodePacked(
            "https://theconvo.space/api/identity?apikey=CONVO&address=",
            addressToString(_for)
        ));

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
        tokenCounter += 1;
        emit ScoreUpdated(_add, _score);
    }

    function refreshScore(uint256 _tokenId) external {
        require(_tokenId < tokenCounter, "OMNID: Invalid _tokenId");
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillRefresh.selector);
        address tokenOwner = ownerOf(_tokenId);

        string memory reqApiAddress = string(abi.encodePacked(
            "https://theconvo.space/api/identity?address=",
            ownerOf(_tokenId),
            "&apikey=CONVO"
        ));

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
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "Omnid:Only owner can update Skin.");
        require(descriptor.isValidSkinId(_newSkinId) == true, "OMNID: Invalid Skin");

        INftDescriptor.IdDetails memory newDeets = addressToIdDetails[tokenOwner];
        newDeets.skinIndex = _newSkinId;
        addressToIdDetails[tokenOwner] = newDeets;

        emit SkinUpdated(tokenOwner, _tokenId, _newSkinId);
    }

    function updateEtching(uint256 _tokenId, string memory _newEtching) public {
        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "Omnid:Only owner can update Ethching.");

        INftDescriptor.IdDetails memory newDeets = addressToIdDetails[tokenOwner];
        newDeets.etching = _newEtching;
        addressToIdDetails[tokenOwner] = newDeets;

        emit EtchingUpdated(tokenOwner, _tokenId, _newEtching);
    }

    function addressToString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    // Only for Testing.
    function createIdDev(address _for, uint256 _score, string memory _etching, uint256 _skinIndex) external payable onlyAdmin {

        uint256 newItemId = tokenCounter;

        INftDescriptor.IdDetails memory newDeets = INftDescriptor.IdDetails( _score, block.timestamp, _skinIndex, _etching );
        addressToIdDetails[_for] = newDeets;

        _safeMint(_for, newItemId);
        tokenCounter += 1;

    }

}

/*===============================
                        _     _
                       (_)   | |
   ___  _ __ ___  _ __  _  __| |
  / _ \| '_ ` _ \| '_ \| |/ _` |
 | (_) | | | | | | | | | | (_| |
 \___/|_| |_| |_|_| |_|_|\__,_|

===============================*/

// SPDX-License-Identifier: AGPL-3.0
pragma solidity >=0.8.4 <0.9.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/utils/Strings.sol';
import 'base64-sol/base64.sol';

contract Omnid is ERC721, ChainlinkClient {

    using Strings for uint256;

    // Chainlink

    using Chainlink for Chainlink.Request;

    bytes32 private jobId;
    uint256 private fee;

    mapping(bytes32 => address) public requestIdToAddress;
    mapping(bytes32 => bool) public requestIdFulfilled;
    mapping(address => uint256) public addressToScore;
    mapping(address => string) public addressToEtching;

    event RequestFulfilled(bytes32 indexed requestId, uint256 indexed score);
    event ScoreUpdated(address indexed who, uint256 indexed score);

    // OMNID

    uint256 public tokenCounter;
    address public admin;

    constructor() ERC721("Omnid", "OMNID") {
        tokenCounter = 0;
        admin = msg.sender;

        uint256 chainId;
        assembly { chainId := chainid() }
        if (chainId == 80001){ // matic mumbai config
            setChainlinkOracle(0x0bDDCD124709aCBf9BB3F824EbC61C87019888bb);
            setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
            jobId = "2bb15c3f9cfc4336b95012872ff05092";
            fee = 0.01  * (10 ** 18); //  LINK
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

    function totalSupply() external view returns (uint256) {
        return tokenCounter;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        address ownerAddress = ownerOf(tokenId);
        return constructTokenURI(ownerAddress, tokenId);
    }

    function constructTokenURI(address _add, uint256 _tokenId) public view returns (string memory) {

        uint256 score = addressToScore[_add];
        string memory etching = addressToEtching[_add];

        bytes memory image = abi.encodePacked(
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='4.69 4.41 250 400'><path id='bg' fill='#1b2798' d='M9.65 8.04h241.16v329.58H9.65z'/><path id='frame' fill='#f9f9f9' d='M4.69 16.41v375c0 6.6 5.4 12 12 12h226c6.6 0 12-5.4 12-12v-375c0-6.6-5.4-12-12-12h-226c-6.6 0-12 5.4-12 12Zm245.5 321h-241V17.91c0-5.5 4.5-10 10-10h221c5.5 0 10 4.5 10 10v319.5Z'/><g id='details' fill='#b3b3b3'><text font-family='Arial' font-size='14' style='white-space:pre' transform='translate(24.4 368.02)'>",
            etching,
            "</text><text font-family='Consolas' font-size='10' style='white-space:pre' transform='translate(24.49 379.68)'>0x",
            prettyAddress(_add)," #",_tokenId.toString(),
            "</text></g><g id='logo' fill='#ccc' transform='translate(4.69 3.41)'><path d='M209.3 361.1a7.06 7.06 0 0 0 0 9.9c2.7 2.7 7.2 2.7 9.9 0l-4.9-4.9 4.9-4.9a6.8 6.8 0 0 0-9.9-.1z'/><circle cx='222.3' cy='366' r='2.9'/></g><text id='score' fill='#fff' font-family='Verdana' font-size='39.33' letter-spacing='-1.1' opacity='.65' style='white-space:pre' transform='matrix(.8791 0 0 1 36.43 67.11)'>",
            score.toString(),
            "</text><linearGradient id='chipGradient' x1='197.32' x2='225.96' y1='34.06' y2='73.76' gradientTransform='translate(4.69 3.41)' gradientUnits='userSpaceOnUse'><stop offset='.16' stop-color='#fff'/><stop offset='.93' stop-color='gray'/></linearGradient><path id='chip' fill='url(#chipGradient)' d='M204.09 59.41v-2.6h-5.2v9.6c0 2.7 2.5 5 5.5 5h5.5v-8.8h-2.6c-1.5 0-3.2-1.4-3.2-3.2Zm1.3-12.5v12.3c0 1.1 1 2 2.3 2h11.3c1.2 0 2.3-.9 2.3-2v-12.6c0-1-.9-1.8-1.9-1.8h-11.7c-1.2 0-2.3 1-2.3 2.1Zm-1.3 2.9h-5.2v5.5h5.2v-5.5Zm7.1 21.6h4.8v-8.8h-4.8v8.8Zm11-36.5h-4.8v8.2h1.9c2 0 3.5 1.4 3.5 3.2v2.3h4.8v-8.8c.1-2.7-2.4-4.9-5.4-4.9Zm.7 20.4h4.8v-5.5h-4.8v5.5Zm-18.8-9c0-1.8 1.6-3.2 3.2-3.2h2.6v-8.2h-5.5c-3 0-5.5 2.2-5.5 5v8.8h5.2v-2.4Zm18.8 13.1c0 1.8-1.6 3.2-3.5 3.2h-1.9v8.8h4.8c3 0 5.5-2.2 5.5-5v-9.6h-4.8v2.6Zm-6.8-24.5h-4.8v8.2h4.8v-8.2Z'/></svg>"
        );

        bytes memory json = abi.encodePacked(
            '{',
                '"name":"OMNID: ', _tokenId.toString(), '",',
                '"description":"OMIND: ', _tokenId.toString(), '",',
                '"image":"data:image/svg+xml;base64,', Base64.encode(image),'"',
            '}'
        );

        return string(abi.encodePacked("data:application/json;base64,",Base64.encode(json)));

    }

    function createId(address _for, string memory _etching) external {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        string memory reqApiAddress = string(abi.encodePacked(
            "https://theconvo.space/api/identity?address=",
            addressToString(_for),
            "&apikey=CONVO"
        ));

        request.add("get", reqApiAddress);

        string[] memory path = new string[](1);
        path[0] = "score";
        request.addStringArray("path", path);

        bytes32 requestId = sendChainlinkRequest(request, fee);
        requestIdToAddress[requestId] = _for;
        addressToEtching[_for] = _etching;
    }

    function fulfill(bytes32 _requestId, uint256 _score) public recordChainlinkFulfillment(_requestId) {
        require(requestIdFulfilled[_requestId] == false, "Omnid:Request already Fulfilled");
        emit RequestFulfilled(_requestId, _score);

        uint256 newItemId = tokenCounter;
        address _add = requestIdToAddress[_requestId];
        addressToScore[_add] = _score;

        _safeMint(_add, newItemId);
        tokenCounter += 1;
    }

    function refreshScore(uint256 _tokenId) external {
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
        addressToScore[add] = _score;
        emit ScoreUpdated(add, _score);
    }

    // Utility Functions
    function prettyAddress(address x) internal pure returns (string memory) {
        string memory add = addressToString(x);
        return string(abi.encodePacked(substring(add, 0, 3),"...",substring(add, 37, 40)));
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

    function substring(string memory str, uint startIndex, uint endIndex) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex-startIndex);
        for(uint i = startIndex; i < endIndex; i++) {
            result[i-startIndex] = strBytes[i];
        }
        return string(result);
    }

    // Only for Testing.
    function createIdDev(address _for, uint256 _score, string memory _etching) external payable onlyAdmin {

        uint256 newItemId = tokenCounter;
        addressToScore[_for] = _score;
        addressToEtching[_for] = _etching;
        _safeMint(_for, newItemId);
        tokenCounter += 1;

    }

}

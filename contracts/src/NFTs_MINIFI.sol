// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/* Smart Contract deployed in Base Mainnet
 * Link: https://basescan.org/address/0x6D271dc007c8e96f9dFD15aa71bd55c00314a9C4#code
 */

contract MINIFI_NFT is ERC721URIStorage {
    struct NFTData {
        string name;
        string uri;
    }

    NFTData[] public nftTypes; // NFT types available
    IERC20 public usdc;
    address public owner;
    uint256 public randomPrice; // 1 USDC
    uint256 public selectPrice; // 3 USDC
    uint256 private _tokenCounter;

    mapping(uint256 => uint256) public tokenIdToType; // tokenId => nftTypes index
    mapping(address => bool) public hasMintedFree; // free mint per wallet control

    constructor(address _usdc) ERC721("UniqueNFT", "UNFT") {
        owner = msg.sender;
        usdc = IERC20(_usdc);
        randomPrice = 1e6; // 1 USDC (6 decimals)
        selectPrice = 3e6; // 3 USDC

        // Add 10 NFTs with name and link
        nftTypes.push(NFTData("Sunnyo", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeib43fgjgnrzq52cqqb67l2d7zbpdpnunyzhljjpqoi4p4ecdsllxy"));
        nftTypes.push(NFTData("Jellodras", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeihdd4epuqqh5ai3kid3q5rl4cse7fs6jzvlg6xiwelkxf5jz7ehuq"));
        nftTypes.push(NFTData("Lumibel", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeiesypnxl65maah2aq3bud3y7qfmykmxshxdstzm64huzsfownm7h4"));
        nftTypes.push(NFTData("Snoodella", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeih5gjgkeooxc4y4mpjl7gggyobjuxua2h5lqd7jmkyau6266n34ti"));
        nftTypes.push(NFTData("Melloba", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeibm2cv3gc3inh4swm3cbsjin3lmuc6ddwqqsl546gqv2jrd6o4u3m"));
        nftTypes.push(NFTData("Wistrow", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeih2it3ta2lrdugjp4isr7krymat57yvsan53gnqhyno3kx3vqzrue"));
        nftTypes.push(NFTData("Dozuki", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeidogcawjm56tx6dteh4k7jqrqtdgalzncjifri5ddqykeheza6aoe"));
        nftTypes.push(NFTData("Orbitron", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeifytibngk2ovr74obdhxaxwmx6lfugxiav5y6ahwjh4xl5a5v5nby"));
        nftTypes.push(NFTData("Solara", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeihd4kfmvnocdbryog3vasuu2wi6cjzk6vqx6hwmamxhtu3u3npyvm"));
        nftTypes.push(NFTData("Bubbit", "https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeiaqamoffhahdihwhih2wxfzn4ieegbtrgskdhtwr7ezrh4lcpx5ve"));
    }

    // -----------------------------
    // Free random mint (only once per wallet)
    // -----------------------------
    function mintRandomFree() external {
        require(!hasMintedFree[msg.sender], "Free mint already used");

        uint256 index = _getRandomIndex(msg.sender);
        uint256 tokenId = _tokenCounter;
        _tokenCounter++;

        tokenIdToType[tokenId] = index;
        hasMintedFree[msg.sender] = true;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, nftTypes[index].uri);
    }

    // -----------------------------
    // Paid random mint 1 USDC
    // -----------------------------
    function mintRandomPaid() external {
        require(usdc.transferFrom(msg.sender, owner, randomPrice), "USDC payment failed");

        uint256 index = _getRandomIndex(msg.sender);
        uint256 tokenId = _tokenCounter;
        _tokenCounter++;

        tokenIdToType[tokenId] = index;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, nftTypes[index].uri);
    }

    // -----------------------------
    // Paid select mint 3 USDC
    // -----------------------------
    function mintSelect(uint256 index) external {
        require(index < nftTypes.length, "Invalid index");
        require(usdc.transferFrom(msg.sender, owner, selectPrice), "USDC payment failed");

        uint256 tokenId = _tokenCounter;
        _tokenCounter++;

        tokenIdToType[tokenId] = index;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, nftTypes[index].uri);
    }

    // -----------------------------
    // Get NFT name by tokenId
    // -----------------------------
    function getTokenName(uint256 tokenId) external view returns (string memory) {
        uint256 index = tokenIdToType[tokenId];
        return nftTypes[index].name;
    }

    // -----------------------------
    // Internal function to get random index
    // -----------------------------
    function _getRandomIndex(address user) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, user, blockhash(block.number - 1)))) % nftTypes.length;
    }

    // -----------------------------
    // Block burn
    // -----------------------------
    function burn(uint256) external pure {
        revert("Burn not allowed");
    }
}

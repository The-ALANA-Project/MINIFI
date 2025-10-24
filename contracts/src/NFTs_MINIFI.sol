// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MINIFI_NFT is ERC721URIStorage, Ownable {
    // Counter for the next available token ID
    uint256 public nextTokenId = 1;
    // Address of the USDC token contract
    address public usdc = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    // Address of the Unlock Protocol (UP) contract
    address public up = 0xaC27fa800955849d6D17cC8952Ba9dD6EAA66187;
    // Address designated to receive USDC payments
    address public treasury = 0xd806A01E295386ef7a7Cea0B9DA037B242622743;

    // Mapping to track if an address has already minted a free NFT
    mapping(address => bool) public hasMintedFree;

    // Constructor initializes the ERC721 contract with a name and symbol,
    // and sets the deployer as the owner.
    constructor() ERC721("MINIFI", "MIFI") Ownable(msg.sender) {}

    /**
     * @dev Allows a user to mint one free NFT.
     * Requires that the sender has not previously minted a free NFT.
     * @param tokenURI_ The URI for the NFT's metadata.
     */
    function mintFreeRandom(string memory tokenURI_) external {
        require(!hasMintedFree[msg.sender], "You have already minted the free NFT");
        _mintToken(msg.sender, tokenURI_);
        hasMintedFree[msg.sender] = true;
    }

    /**
     * @dev Allows a user to mint a random NFT by paying 1 USDC.
     * Transfers 1 USDC from the sender to the treasury address.
     * @param tokenURI_ The URI for the NFT's metadata.
     */
    function mintRandom(string memory tokenURI_) external {
        uint256 amount = 1 * 10**6; // USDC has 6 decimals
        IERC20(usdc).transferFrom(msg.sender, treasury, amount);
        _mintToken(msg.sender, tokenURI_);
    }

    /**
     * @dev Allows a user to mint a selected NFT by paying 3 USDC.
     * Transfers 3 USDC from the sender to the treasury address.
     * @param tokenURI_ The URI for the NFT's metadata.
     */
    function mintSelected(string memory tokenURI_) external {
        uint256 amount = 3 * 10**6; // USDC has 6 decimals
        IERC20(usdc).transferFrom(msg.sender, treasury, amount);
        _mintToken(msg.sender, tokenURI_);
    }

    /**
     * @dev Internal helper function to mint an NFT and set its URI.
     * Increments the nextTokenId for subsequent mints.
     * @param to The address to which the NFT will be minted.
     * @param tokenURI_ The URI for the NFT's metadata.
     */
    function _mintToken(address to, string memory tokenURI_) internal {
        uint256 tokenId = nextTokenId;
        nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
    }

    /**
     * @dev Allows the contract owner to update the treasury address.
     * This is an optional function to change where USDC payments are sent.
     * @param newTreasury The new address for the treasury.
     */
    function setTreasury(address newTreasury) external onlyOwner {
        treasury = newTreasury;
    }
}

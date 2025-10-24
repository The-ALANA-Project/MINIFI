// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/* Smart Contract deployed in Base Mainnet
 * Link: https://basescan.org/address/0x1a5794aeAb598ac3D6b0F66450a33E0078c43264#code
 */

/// @title MINIFI Feed and Level Contract
/// @notice Handles feeding Turriteccos, gaining experience, and leveling up
contract MINIFI_FeedAndLevel {
    // ERC20 token used to feed creatures
    IERC20 public upToken;

    // ERC721 NFT contract representing the Turriteccos
    IERC721 public minifiNFT;

    // Wallet where UP payments are sent
    address public projectWallet;

    // Struct to store stats for each NFT
    struct CreatureStats {
        uint256 level;      // Current level
        uint256 experience; // Current experience points
        uint256 lastFed;    // Timestamp of last feeding
    }

    // Mapping from tokenId to its stats
    mapping(uint256 => CreatureStats) public stats;

    // -----------------------------
    // Food costs (in UP tokens)
    // -----------------------------
    uint256 public constant SNACK_COST = 1e18;
    uint256 public constant MEAL_COST = 5e18;
    uint256 public constant FEAST_COST = 10e18;
    uint256 public constant DELUXE_COST = 25e18;

    // -----------------------------
    // Experience gained per food type
    // -----------------------------
    uint256 public constant SNACK_EXP = 10;
    uint256 public constant MEAL_EXP = 50;
    uint256 public constant FEAST_EXP = 100;
    uint256 public constant DELUXE_EXP = 250;

    // Event emitted whenever a creature is fed
    event Fed(
        address indexed user,
        uint256 indexed tokenId,
        string foodType,
        uint256 expGained,
        uint256 newLevel
    );

    /// @notice Constructor sets the token contracts and project wallet
    /// @param _upToken The address of the UP ERC20 token
    /// @param _minifiNFT The address of the NFTs_MINIFI ERC721 contract
    /// @param _projectWallet The wallet that receives feeding payments
    constructor(address _upToken, address _minifiNFT, address _projectWallet) {
        upToken = IERC20(_upToken);
        minifiNFT = IERC721(_minifiNFT);
        projectWallet = _projectWallet;
    }

    // -----------------------------
    // Feed a Turritecco
    // -----------------------------
    /// @notice Feed your NFT with a specific food type
    /// @param tokenId The NFT tokenId
    /// @param foodType Type of food: "snack", "meal", "feast", or "deluxe"
    function feed(uint256 tokenId, string memory foodType) external {
        // Only the owner of the NFT can feed it
        require(minifiNFT.ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");

        uint256 cost;
        uint256 exp;

        // Determine cost and experience based on food type
        if (keccak256(bytes(foodType)) == keccak256("snack")) {
            cost = SNACK_COST;
            exp = SNACK_EXP;
        } else if (keccak256(bytes(foodType)) == keccak256("meal")) {
            cost = MEAL_COST;
            exp = MEAL_EXP;
        } else if (keccak256(bytes(foodType)) == keccak256("feast")) {
            cost = FEAST_COST;
            exp = FEAST_EXP;
        } else if (keccak256(bytes(foodType)) == keccak256("deluxe")) {
            cost = DELUXE_COST;
            exp = DELUXE_EXP;
        } else {
            revert("Invalid food type");
        }

        // Transfer UP tokens from user to project wallet
        require(upToken.transferFrom(msg.sender, projectWallet, cost), "Payment failed");

        // Update stats
        CreatureStats storage c = stats[tokenId];
        c.experience += exp;
        c.lastFed = block.timestamp;

        // Calculate required experience for next level
        uint256 requiredExp = c.level * 100;
        if (requiredExp == 0) requiredExp = 100;

        // Level up if enough experience
        if (c.experience >= requiredExp) {
            c.level++;
            c.experience = 0;
        }

        // Emit event for UI or analytics
        emit Fed(msg.sender, tokenId, foodType, exp, c.level);
    }

    // -----------------------------
    // View functions
    // -----------------------------

    /// @notice Get the stats of a specific NFT
    /// @param tokenId The NFT tokenId
    /// @return CreatureStats struct containing level, experience, lastFed
    function getStats(uint256 tokenId) external view returns (CreatureStats memory) {
        return stats[tokenId];
    }

    /// @notice Get the experience required for the next level
    /// @param tokenId The NFT tokenId
    /// @return Required experience points for next level
    function getNextLevelExp(uint256 tokenId) external view returns (uint256) {
        uint256 level = stats[tokenId].level;
        if (level == 0) return 100;
        return level * 100;
    }
}

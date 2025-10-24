import "forge-std/Test.sol";
import "../src/MINIFI_Feed_Level.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Simple mock ERC20 for testing purposes
contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

// Simple mock ERC721 for testing purposes
contract MockERC721 is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
    function mint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
    // Override ownerOf to ensure it behaves as expected for MINIFI_FeedAndLevel
    function ownerOf(uint256 tokenId) public view override returns (address) {
        return super.ownerOf(tokenId);
    }
}

contract MINIFI_Feed_Level_Test is Test {
    MINIFI_FeedAndLevel public feedAndLevel;
    MockERC20 public upToken;
    MockERC721 public minifiNFT;
    address public deployer;
    address public user1;
    address public projectWallet;

    uint256 public constant NFT_ID_1 = 1;
    uint256 public constant NFT_ID_2 = 2;

    function setUp() public {
        deployer = address(this); // The test contract itself acts as deployer
        user1 = makeAddr("user1");
        projectWallet = makeAddr("projectWallet");

        // Deploy mock tokens
        upToken = new MockERC20("UP Token", "UP");
        minifiNFT = new MockERC721("MINIFI NFT", "MINIFI");

        // Deploy the main contract
        feedAndLevel = new MINIFI_FeedAndLevel(address(upToken), address(minifiNFT), projectWallet);

        // Mint NFTs to user1
        vm.startPrank(deployer);
        minifiNFT.mint(user1, NFT_ID_1);
        minifiNFT.mint(user1, NFT_ID_2);
        vm.stopPrank();

        // Mint UP tokens to user1 and approve feedAndLevel contract
        vm.startPrank(deployer);
        upToken.mint(user1, 1000e18); // Give user1 plenty of UP tokens
        vm.stopPrank();

        vm.startPrank(user1);
        upToken.approve(address(feedAndLevel), type(uint256).max); // Approve max amount for feeding
        vm.stopPrank();
    }

    // Test: Constructor initializes contracts and project wallet correctly
    function test_Constructor() public {
        assertEq(address(feedAndLevel.upToken()), address(upToken));
        assertEq(address(feedAndLevel.minifiNFT()), address(minifiNFT));
        assertEq(feedAndLevel.projectWallet(), projectWallet);
    }

    // Test: Get initial stats for a newly minted NFT
    function test_GetInitialStats() public {
        MINIFI_FeedAndLevel.CreatureStats memory stats = feedAndLevel.getStats(NFT_ID_1);
        assertEq(stats.level, 0);
        assertEq(stats.experience, 0);
        assertEq(stats.lastFed, 0);
    }

    // Test: Get initial required experience for the next level
    function test_GetInitialNextLevelExp() public {
        assertEq(feedAndLevel.getNextLevelExp(NFT_ID_1), 100);
    }

    // Test: Feeding a "snack" successfully updates stats and transfers tokens
    function test_Feed_Snack() public {
        vm.startPrank(user1);
        uint256 initialUserBalance = upToken.balanceOf(user1);
        uint256 initialProjectBalance = upToken.balanceOf(projectWallet);

        vm.expectEmit(true, true, false, true);
        emit MINIFI_FeedAndLevel.Fed(user1, NFT_ID_1, "snack", feedAndLevel.SNACK_EXP(), 0);
        feedAndLevel.feed(NFT_ID_1, "snack");

        assertEq(upToken.balanceOf(user1), initialUserBalance - feedAndLevel.SNACK_COST());
        assertEq(upToken.balanceOf(projectWallet), initialProjectBalance + feedAndLevel.SNACK_COST());

        MINIFI_FeedAndLevel.CreatureStats memory stats = feedAndLevel.getStats(NFT_ID_1);
        assertEq(stats.level, 0);
        assertEq(stats.experience, feedAndLevel.SNACK_EXP());
        assertTrue(stats.lastFed > 0); // Check if timestamp is updated
        vm.stopPrank();
    }

    // Test: Feeding enough to trigger a level up
    function test_Feed_LevelUp() public {
        vm.startPrank(user1);
        // Feed 9 snacks (9 * 10 EXP = 90 EXP)
        for (uint i = 0; i < 9; i++) {
            feedAndLevel.feed(NFT_ID_1, "snack");
        }
        // The 10th snack should trigger level up (100 EXP total)
        vm.expectEmit(true, true, false, true);
        emit MINIFI_FeedAndLevel.Fed(user1, NFT_ID_1, "snack", feedAndLevel.SNACK_EXP(), 1);
        feedAndLevel.feed(NFT_ID_1, "snack");

        MINIFI_FeedAndLevel.CreatureStats memory stats = feedAndLevel.getStats(NFT_ID_1);
        assertEq(stats.level, 1);
        assertEq(stats.experience, 0); // Experience should reset after leveling up
        assertEq(feedAndLevel.getNextLevelExp(NFT_ID_1), 100); // Level 1 requires 100 exp for level 2
        vm.stopPrank();
    }

    // Test: Feeding with excess experience results in multiple level ups and remaining experience
    function test_Feed_MultipleLevelUps() public {
        vm.startPrank(user1);
        // Feed a "deluxe" food (250 EXP)
        // Level 0 -> Level 1 requires 100 EXP
        // Level 1 -> Level 2 requires 100 EXP
        // Total required for Level 2 = 200 EXP
        // 250 EXP - 200 EXP = 50 EXP remaining
        vm.expectEmit(true, true, false, true);
        emit MINIFI_FeedAndLevel.Fed(user1, NFT_ID_1, "deluxe", feedAndLevel.DELUXE_EXP(), 2);
        feedAndLevel.feed(NFT_ID_1, "deluxe");

        MINIFI_FeedAndLevel.CreatureStats memory stats = feedAndLevel.getStats(NFT_ID_1);
        assertEq(stats.level, 2);
        assertEq(stats.experience, 50); // 250 - 100 (L1) - 100 (L2) = 50 remaining
        assertEq(feedAndLevel.getNextLevelExp(NFT_ID_1), 200); // Level 2 requires 200 exp for level 3
        vm.stopPrank();
    }

    // Test: Reverts when feeding with an invalid food type
    function test_Feed_RevertInvalidFoodType() public {
        vm.startPrank(user1);
        vm.expectRevert("Invalid food type");
        feedAndLevel.feed(NFT_ID_1, "pizza");
        vm.stopPrank();
    }

    // Test: Reverts when user has insufficient UP tokens
    function test_Feed_RevertInsufficientFunds() public {
        address poorUser = makeAddr("poorUser");
        vm.startPrank(poorUser);
        // Try to feed a deluxe meal (25e18 cost) without any tokens
        vm.expectRevert("Payment failed"); // Reverts from transferFrom
        feedAndLevel.feed(NFT_ID_1, "deluxe");
        vm.stopPrank();
    }

    // Test: Reverts when user has not approved the contract to spend UP tokens
    function test_Feed_RevertNoApproval() public {
        address unapprovedUser = makeAddr("unapprovedUser");
        vm.startPrank(deployer);
        upToken.mint(unapprovedUser, 100e18); // Give funds but no approval
        vm.stopPrank();

        vm.startPrank(unapprovedUser);
        vm.expectRevert("Payment failed"); // Reverts from transferFrom
        feedAndLevel.feed(NFT_ID_1, "snack");
        vm.stopPrank();
    }

    // Test: Reverts when trying to feed a non-existent NFT
    function test_Feed_RevertNonExistentNFT() public {
        vm.startPrank(user1);
        vm.expectRevert("ERC721: invalid token ID"); // Reverts from minifiNFT.ownerOf(tokenId)
        feedAndLevel.feed(999, "snack");
        vm.stopPrank();
    }

    // Test: getStats returns correct values after feeding
    function test_GetStats_AfterFeeding() public {
        vm.startPrank(user1);
        feedAndLevel.feed(NFT_ID_1, "meal"); // 50 EXP
        vm.stopPrank();

        MINIFI_FeedAndLevel.CreatureStats memory stats = feedAndLevel.getStats(NFT_ID_1);
        assertEq(stats.level, 0);
        assertEq(stats.experience, feedAndLevel.MEAL_EXP());
        assertTrue(stats.lastFed > 0);
    }

    // Test: getNextLevelExp returns correct value after leveling up
    function test_GetNextLevelExp_AfterLevelUp() public {
        vm.startPrank(user1);
        // Feed enough to reach level 1
        for (uint i = 0; i < 10; i++) {
            feedAndLevel.feed(NFT_ID_1, "snack");
        }
        vm.stopPrank();

        assertEq(feedAndLevel.getStats(NFT_ID_1).level, 1);
        assertEq(feedAndLevel.getNextLevelExp(NFT_ID_1), 100); // Level 1 requires 100 for level 2
    }

    // Test: getNextLevelExp returns correct value for a higher level
    function test_GetNextLevelExp_HigherLevel() public {
        vm.startPrank(user1);
        // Feed enough to reach level 2 (200 total EXP)
        feedAndLevel.feed(NFT_ID_1, "deluxe"); // 250 EXP
        vm.stopPrank();

        assertEq(feedAndLevel.getStats(NFT_ID_1).level, 2);
        assertEq(feedAndLevel.getNextLevelExp(NFT_ID_1), 200); // Level 2 requires 200 for level 3
    }
}

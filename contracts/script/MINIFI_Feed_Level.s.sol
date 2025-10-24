import "forge-std/Script.sol";
import "../src/MINIFI_Feed_Level.sol";

contract MINIFI_Feed_Level_Script is Script {
    function run() external returns (MINIFI_FeedAndLevel) {
        // These addresses are provided in the followup prompt.
        address upTokenAddress = 0xaC27fa800955849d6D17cC8952Ba9dD6EAA66187;
        address minifiNFTAddress = 0x6D271dc007c8e96f9dFD15aa71bd55c00314a9C4;
        address projectWalletAddress = 0xd806A01E295386ef7a7Cea0B9DA037B242622743;

        vm.startBroadcast();

        MINIFI_FeedAndLevel feedAndLevel = new MINIFI_FeedAndLevel(
            upTokenAddress,
            minifiNFTAddress,
            projectWalletAddress
        );

        vm.stopBroadcast();

        return feedAndLevel;
    }
}


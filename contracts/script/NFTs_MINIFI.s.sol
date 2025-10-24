// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {MINIFI_NFT} from "../src/NFTs_MINIFI.sol"; // Import the MINIFI_NFT contract

contract NFTs_MINIFIScript is Script { // Renamed the script contract
    MINIFI_NFT public minifiNFT; // Changed the contract variable to MINIFI_NFT

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        address usdcAddress = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913; // USDC contract address on Base Mainnet

        minifiNFT = new MINIFI_NFT(usdcAddress); // Deploy the MINIFI_NFT contract

        console.log("MINIFI_NFT deployed at:", address(minifiNFT));

        vm.stopBroadcast();
    }
}

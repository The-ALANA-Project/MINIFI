// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MINIFI_NFT} from "../src/NFTs_MINIFI.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // Required for MockUSDC

// Mock ERC20 contract to simulate USDC for testing purposes
contract MockUSDC is IERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    string public name = "Mock USDC";
    string public symbol = "mUSDC";
    uint8 public decimals = 6; // USDC typically has 6 decimals
    uint256 private _totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 value) public returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        uint256 currentAllowance = _allowances[from][msg.sender];
        require(currentAllowance >= value, "ERC20: transfer amount exceeds allowance");
        _approve(from, msg.sender, currentAllowance - value);
        _transfer(from, to, value);
        return true;
    }

    // Function to mint new tokens for testing
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        require(_balances[from] >= value, "ERC20: transfer amount exceeds balance");

        _balances[from] -= value;
        _balances[to] += value;
        emit Transfer(from, to, value);
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }
}

contract MINIFI_NFTTest is Test {
    MINIFI_NFT public minifiNFT;
    MockUSDC public mockUSDC;

    address public deployer; // The address that deploys MINIFI_NFT (and thus becomes its owner)
    address public alice;
    address public bob;

    function setUp() public {
        deployer = address(this); // The test contract itself acts as the deployer/owner
        alice = makeAddr("alice");
        bob = makeAddr("bob");

        mockUSDC = new MockUSDC();
        minifiNFT = new MINIFI_NFT(address(mockUSDC));

        // Mint some mock USDC for test accounts to use for paid mints
        mockUSDC.mint(alice, 100e6); // 100 USDC (100 * 10^6 because of 6 decimals)
        mockUSDC.mint(bob, 100e6);   // 100 USDC
    }

    function test_MintRandomFree() public {
        vm.startPrank(alice);
        minifiNFT.mintRandomFree();

        assertEq(minifiNFT.balanceOf(alice), 1, "Alice should have 1 NFT after free mint");
        assertTrue(minifiNFT.hasMintedFree(alice), "Alice should be marked as having minted free");

        // Ensure a second free mint by the same user reverts
        vm.expectRevert("Free mint already used");
        minifiNFT.mintRandomFree();
        vm.stopPrank();

        // Test another user can free mint once
        vm.startPrank(bob);
        minifiNFT.mintRandomFree();
        assertEq(minifiNFT.balanceOf(bob), 1, "Bob should have 1 NFT after free mint");
        assertTrue(minifiNFT.hasMintedFree(bob), "Bob should be marked as having minted free");
        vm.stopPrank();
    }

    function test_MintRandomPaid() public {
        uint256 initialAliceUSDC = mockUSDC.balanceOf(alice);
        uint256 initialOwnerUSDC = mockUSDC.balanceOf(deployer); // minifiNFT.owner() is deployer

        vm.startPrank(alice);
        // Alice needs to approve the NFT contract to spend her USDC
        mockUSDC.approve(address(minifiNFT), minifiNFT.randomPrice());
        minifiNFT.mintRandomPaid();
        vm.stopPrank();

        assertEq(minifiNFT.balanceOf(alice), 1, "Alice should have 1 NFT after paid random mint");
        assertEq(mockUSDC.balanceOf(alice), initialAliceUSDC - minifiNFT.randomPrice(), "Alice's USDC balance incorrect");
        assertEq(mockUSDC.balanceOf(deployer), initialOwnerUSDC + minifiNFT.randomPrice(), "Owner's USDC balance incorrect");
    }

    function test_MintSelect() public {
        uint256 selectIndex = 0; // Choose the first NFT type (Sunnyo)
        uint256 initialBobUSDC = mockUSDC.balanceOf(bob);
        uint256 initialOwnerUSDC = mockUSDC.balanceOf(deployer);

        vm.startPrank(bob);
        // Bob needs to approve the NFT contract to spend his USDC
        mockUSDC.approve(address(minifiNFT), minifiNFT.selectPrice());
        minifiNFT.mintSelect(selectIndex);
        vm.stopPrank();

        assertEq(minifiNFT.balanceOf(bob), 1, "Bob should have 1 NFT after paid select mint");
        uint256 tokenId = minifiNFT.tokenOfOwnerByIndex(bob, 0); // Get the ID of the first token Bob owns
        assertEq(minifiNFT.tokenIdToType(tokenId), selectIndex, "Minted NFT should be of selected type");
        assertEq(mockUSDC.balanceOf(bob), initialBobUSDC - minifiNFT.selectPrice(), "Bob's USDC balance incorrect");
        assertEq(mockUSDC.balanceOf(deployer), initialOwnerUSDC + minifiNFT.selectPrice(), "Owner's USDC balance incorrect");
    }

    function test_MintSelect_InvalidIndexReverts() public {
        vm.startPrank(alice);
        // Approve enough USDC for the transaction to attempt, even if it reverts
        mockUSDC.approve(address(minifiNFT), minifiNFT.selectPrice());
        vm.expectRevert("Invalid index");
        minifiNFT.mintSelect(minifiNFT.nftTypes.length()); // Index out of bounds
        vm.stopPrank();
    }

    function test_GetTokenName() public {
        vm.startPrank(alice);
        // First, mint a token to get a tokenId
        minifiNFT.mintRandomFree();
        uint256 tokenId = minifiNFT.tokenOfOwnerByIndex(alice, 0);
        vm.stopPrank();

        // Get the expected name from the contract's public `nftTypes` array
        uint256 typeIndex = minifiNFT.tokenIdToType(tokenId);
        // Access the struct directly from the public array
        (string memory expectedName, ) = minifiNFT.nftTypes(typeIndex);

        assertEq(minifiNFT.getTokenName(tokenId), expectedName, "getTokenName should return the correct name");
    }

    function test_BurnReverts() public {
        vm.expectRevert("Burn not allowed");
        minifiNFT.burn(0); // Any tokenId should revert as burn is blocked
    }
}

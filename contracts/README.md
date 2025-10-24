## `MINIFI Smart Contracts`

MINIFI is a playful DeFi onboarding platform where users can mint unique Turritecco NFTs, feed them with UP tokens, and level them up. Feeding also represents a micro-investment, with all tokens sent to the project wallet (future versions could integrate yield generation like Aave).

This repository contains **two main smart contracts**:

1. **MINIFI_NFT.sol** – Handles NFT creation and minting.
2. **MINIFI_FeedAndLevel.sol** – Handles feeding, experience, and leveling up of Turritecco NFTs.

---

## 1. `MINIFI_NFT.sol`

**Description:**
This contract allows users to mint Turritecco NFTs. It supports:

* **Free random mint** (once per wallet).
* **Paid random mint** for 1 USDC.
* **Paid select mint** for 3 USDC (choose a specific Turritecco).

Each NFT has a unique **name** and **URI**, stored in Pinata IPFS. The NFT metadata includes visual representation and identity. Burn is disabled to prevent NFT destruction.

**Key Features:**

* `mintRandomFree()`: Free random NFT for new users.
* `mintRandomPaid()`: Mint random NFT by paying 1 USDC.
* `mintSelect(index)`: Mint a chosen NFT by paying 3 USDC.
* `_getRandomIndex(address)`: Generates a random NFT selection index.
* `getTokenName(tokenId)`: Returns the NFT name.

**Tech & Libraries:**

* Solidity 0.8.20
* OpenZeppelin `ERC721URIStorage`
* OpenZeppelin `IERC20`
* OpenZeppelin `Ownable`

**Deployment:**

* Base Mainnet
* Contract Address: [0x6D271dc007c8e96f9dFD15aa71bd55c00314a9C4](https://basescan.org/address/0x6D271dc007c8e96f9dFD15aa71bd55c00314a9C4#code)
* USDC Token Address: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

**Example NFT Names & URIs:**

* Sunnyo: `https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeib43fgjgnrzq52cqqb67l2d7zbpdpnunyzhljjpqoi4p4ecdsllxy`
* Jellodras: `https://teal-united-parrot-418.mypinata.cloud/ipfs/bafybeihdd4epuqqh5ai3kid3q5rl4cse7fs6jzvlg6xiwelkxf5jz7ehuq`
* …and 8 more unique Turriteccos

---

## 2. `MINIFI_FeedAndLevel.sol`

**Description:**
This contract allows users to **feed their Turritecco NFTs**, gain experience, and level up. Feeding also transfers **UP tokens** to the project wallet.

**Key Features:**

* `feed(tokenId, foodType)`: Feed your NFT. Supported food types: `snack`, `meal`, `feast`, `deluxe`. Each has a **cost in UP** and **experience points**:

| Food Type | Cost (UP) | Experience |
| --------- | --------- | ---------- |
| Snack     | 1 UP      | 10         |
| Meal      | 5 UP      | 50         |
| Feast     | 10 UP     | 100        |
| Deluxe    | 25 UP     | 250        |

* **Leveling logic**:

  * Level 1 requires 100 XP, level 2 requires 200 XP, level 3 requires 300 XP, etc.
  * When experience reaches required XP, the creature levels up and experience resets.

* `getStats(tokenId)`: Returns the current stats of the NFT (level, experience, last fed).

* `getNextLevelExp(tokenId)`: Returns required experience points for the next level.

**Tech & Libraries:**

* Solidity 0.8.20
* OpenZeppelin `IERC20` for UP token
* OpenZeppelin `IERC721` for NFTs

**Deployment:**

* Base Mainnet
* Contract Address: [0x1a5794aeAb598ac3D6b0F66450a33E0078c43264](https://basescan.org/address/0x1a5794aeAb598ac3D6b0F66450a33E0078c43264#code)
* UP Token Address: `0xaC27fa800955849d6D17cC8952Ba9dD6EAA66187`
* NFTs_MINIFI Contract Address: `0x6D271dc007c8e96f9dFD15aa71bd55c00314a9C4`
* Project Wallet: `0xd806A01E295386ef7a7Cea0B9DA037B242622743`

**Flow Example:**

1. User mints a Turritecco NFT through `MINIFI_NFT`.
2. User feeds the NFT using `MINIFI_FeedAndLevel` by paying UP tokens.
3. Stats update, experience is gained, and NFT levels up automatically.
4. Payments go to the project wallet (ready for future Aave integration).

---

## How the System Works Together

1. **NFT Minting (MINIFI_NFT.sol)**: Users get unique Turritecco NFTs via free or paid mint.
2. **Feeding & Leveling (MINIFI_FeedAndLevel.sol)**: Users interact with their NFTs to grow them, pay with UP tokens, and track levels/experience.
3. **Token Flow**: All UP payments go to the project wallet. Future versions could deposit into Aave for yield generation.

---

## Links

* **GitHub Repository:** [https://github.com/The-ALANA-Project/MINIFI](https://github.com/The-ALANA-Project/MINIFI)
* **Live Website:** [https://turriteccos.xyz/](https://turriteccos.xyz/)
* **Base Scan – MINIFI_NFT:** [0x6D271dc007c8e96f9dFD15aa71bd55c00314a9C4](https://basescan.org/address/0x6D271dc007c8e96f9dFD15aa71bd55c00314a9C4#code)
* **Base Scan – MINIFI_FeedAndLevel:** [0x1a5794aeAb598ac3D6b0F66450a33E0078c43264](https://basescan.org/address/0x1a5794aeAb598ac3D6b0F66450a33E0078c43264#code)



# 🏆 Real-World Asset Marketplace with ERC721 

Welcome to our Real-World Asset Marketplace, a decentralized platform that allows users to buy, sell, and interact with tokenized real-world assets using ERC721 NFT standards. This platform leverages the security of blockchain and innovative technologies for seamless user experience, connectivity, and secure data access.

---

## 📋 Project Overview

This project provides a marketplace where real-world assets are represented as ERC721 tokens, allowing users to trade digital assets directly on the blockchain. Key technologies used include:

1. **Particle Network** for secure and smooth wallet connections.
2. **Seda Protocol** for authenticated and reliable API calls.
3. **Ethereum Smart Contracts** for managing ERC721 tokens representing assets.

The application is designed to prioritize user experience, ensuring each step of the marketplace interaction is straightforward, secure, and transparent.

---

## 🛠️ Technologies & Tools

- **Solidity**: For writing the smart contracts that handle asset tokenization and marketplace logic.
- **Ethers.js**: To interact with the Ethereum blockchain from the frontend.
- **Particle Network**: For seamless wallet connectivity and secure user login.
- **Seda Protocol**: To access authenticated data, ensuring the reliability and integrity of the marketplace data.
- **React**: Frontend library for creating a responsive, modern user interface.
- **React Toastify**: For displaying dynamic feedback to users, including notifications on wallet connectivity, errors, and transaction status.

---

## 🌐 Key Features

1. **User Authentication & Wallet Connectivity**:
   - Users connect their wallets via the **Particle Network**, enabling secure authentication and a seamless wallet connection experience.
   
2. **API Integration**:
   - Data on assets is retrieved from a trusted source using the **Seda Protocol** to ensure the marketplace has accurate, authenticated information.
   
3. **Tokenized Assets**:
   - Assets are tokenized as **ERC721 tokens** on the blockchain, giving each asset a unique identity. These NFTs allow for ownership verification, transaction history, and a tamper-proof record of asset details.
   
4. **Real-Time NFT Purchase & Listing**:
   - The marketplace displays all available ERC721 NFTs for purchase, with live metadata retrieved from IPFS, ensuring each asset’s details and image are stored in a decentralized manner.
   - Users can instantly purchase NFTs, with real-time transaction processing and feedback on purchase status.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** and **npm**: Ensure you have these installed to run the project.
- **Metamask** (or any compatible wallet): Required for wallet connectivity on supported networks.
- **Infura/Alchemy API Key**: For accessing IPFS metadata (optional but recommended).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GillHapp/seda-rwa-marketplace.git
   cd seda-rwa-marketplace
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory and configure your keys as needed.

4. Start the project:

   ```bash
   npm run dev
   ```

### Connecting to Sepolia Testnet

The marketplace uses the Sepolia testnet to interact with ERC721 tokens. Ensure your wallet is configured to connect to Sepolia.

---

## 💼 Usage

1. **Connecting the Wallet**:
   - Click on the **Connect Wallet** button, powered by **Particle Network**, for a secure connection.
   
2. **Viewing Available Assets**:
   - The marketplace displays a list of available ERC721 tokenized assets, with metadata sourced from IPFS.

3. **Purchasing an NFT**:
   - Click on an NFT card to view details and initiate a purchase.
   - If your wallet balance is insufficient, a notification will inform you.
   - Upon successful purchase, the marketplace listing updates to reflect the sale.

---

## 📈 Future Enhancements

- **Asset Fractionalization**: Allow partial ownership of high-value assets through ERC20 token fragments.
- **Enhanced Analytics**: Dashboard for tracking market trends and asset valuations.
- **Cross-Chain Support**: Integration with other blockchains for wider marketplace reach.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---

## 🙌 Acknowledgments

Special thanks to **Particle Network** for wallet connection support, **Seda Protocol** for providing authenticated data integration, and **Ethers.js** for simplifying blockchain interactions.

--- 

We’re excited to provide a secure, decentralized platform that brings real-world asset trading to the blockchain. 🚀

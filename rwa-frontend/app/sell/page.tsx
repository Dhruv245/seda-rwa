// SPDX-License-Identifier: MIT
"use client";
import React, { useState } from 'react';
import styles from './ListNFT.module.css';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import MyTokenAbi from "../MyTokenAbi.json";

const contractAddress = "0x150D43a900b29f71eDc6793fcc48E6B507C22BDb";

const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) =>
    new ethers.Contract(contractAddress, MyTokenAbi, signerOrProvider);

const ListNFT: React.FC = () => {
    const [tokenId, setTokenId] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleListNFT = async () => {
        if (!tokenId || !price) {
            alert("Please fill in both token ID and price fields.");
            return;
        }

        try {
            setIsLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            const formattedPrice = ethers.parseUnits(price, "ether");

            const tx = await contract.listNFT(tokenId, formattedPrice);
            await tx.wait();
            alert("NFT listed successfully!");
        } catch (error) {
            console.error("Error listing NFT:", error);
            alert("Failed to list NFT.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>List NFT on Marketplace</h1>
            <div className={styles.form}>
                <label className={styles.label}>Token ID</label>
                <input
                    type="text"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    placeholder="Enter NFT Token ID"
                    className={styles.input}
                />

                <label className={styles.label}>Price (ETH)</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price in ETH"
                    className={styles.input}
                    step="0.01"
                />

                <button onClick={handleListNFT} className={styles.button} disabled={isLoading}>
                    {isLoading ? "Listing..." : "List NFT"}
                </button>
            </div>

            {isLoading && (
                <div className={styles.overlay}>
                    <div className={styles.loader}>Listing NFT, please wait...</div>
                </div>
            )}
        </div>
    );
};

export default ListNFT;

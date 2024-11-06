// MintNFT.tsx

// SPDX-License-Identifier: MIT
"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './MintNFT.module.css';
import Web3Modal from 'web3modal';
import MyTokenAbi from "../MyTokenAbi.json";
import { ethers } from 'ethers';
import { Buffer } from 'buffer';
import axios from 'axios';

const INFURA_ID = "2de477c3b1b74816ae5475da6d289208";
const INFURA_SECRET_KEY = "PtTqCNxDi4MM9ZRFDb/AvKh3W0DpWiUeFJVS3d14fLCJvUYaNO8URg";
const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');

const contractAddress = "0x150D43a900b29f71eDc6793fcc48E6B507C22BDb";
const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) => new ethers.Contract(contractAddress, MyTokenAbi, signerOrProvider);

interface FormData {
    image: File | null;
    name: string;
    model: string;
    manufacturer: string;
    price: string;
}

const MintNFT: React.FC = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [formData, setFormData] = useState<FormData>({
        image: null,
        name: '',
        model: '',
        manufacturer: '',
        price: ''
    });

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const responseData = await axios({
                method: 'POST',
                url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
                data: formData,
                headers: {
                    pinata_api_key: '6922b689d1b551ffc215',
                    pinata_secret_api_key: '98490fbb8abc63aced8b2210f8147e8a75c977f2048e99747f69fc16765fb9e0',
                    'Content-Type': 'multipart/form-data',
                },
            });

            const fileUrl = `https://ipfs.infura.io/ipfs/${responseData.data.IpfsHash}`;
            console.log("Image uploaded to IPFS:", fileUrl);
            setImageURL(fileUrl);
        } catch (error) {
            console.error("Error uploading file to IPFS:", error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        async function contractdata() {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            try {
                const name = await contract.name();
                console.log('Name:', name);
                const symbol = await contract.symbol();
                console.log('Symbol:', symbol);
                const owner = await contract.owner();
                console.log('Owner:', owner);
            } catch (error) {
                console.error('Error fetching token URI:', error);
            }
        }

        contractdata();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!imageURL) {
            alert("Please upload an image first.");
            return;
        }

        setIsMinting(true);

        const metadata = {
            image: imageURL,
            name: formData.name,
            model: formData.model,
            manufacturer: formData.manufacturer,
            price: formData.price,
        };

        try {
            const response = await axios({
                method: 'POST',
                url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                data: metadata,
                headers: {
                    pinata_api_key: '6922b689d1b551ffc215',
                    pinata_secret_api_key: '98490fbb8abc63aced8b2210f8147e8a75c977f2048e99747f69fc16765fb9e0',
                    'Content-Type': 'application/json',
                },
            });

            const metadataUrl = `https://ipfs.infura.io/ipfs/${response.data.IpfsHash}`;
            console.log("Metadata uploaded to IPFS:", metadataUrl);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = await fetchContract(signer);

            const tx = await contract.safeMint(metadataUrl, { gasLimit: 300000 });
            const receipt = await tx.wait();
            console.log("Transaction receipt:", receipt);
            console.log("NFT minted successfully with metadata URL:", metadataUrl);
            alert("NFT minted successfully!");
        } catch (error) {
            console.error("Error uploading metadata to IPFS or minting NFT:", error);
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div className={styles.container}>
            {(isUploading || isMinting) && (
                <div className={styles.loaderOverlay}>
                    <div className={styles.loader}>Processing...</div>
                </div>
            )}

            <h1 className={styles.title}>Tokenize Asset</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}></label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className={styles.input}
                        onChange={handleImageUpload}
                        disabled={isUploading || isMinting}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}></label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter asset name"
                        className={styles.input}
                        disabled={isUploading || isMinting}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}></label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="Enter asset model"
                        className={styles.input}
                        disabled={isUploading || isMinting}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}></label>
                    <input
                        type="text"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                        placeholder="Enter manufacturer name"
                        className={styles.input}
                        disabled={isUploading || isMinting}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}></label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Enter price in ETH"
                        className={styles.input}
                        step="0.01"
                        disabled={isUploading || isMinting}
                        required
                    />
                </div>
                <button type="submit" className={styles.button} disabled={isUploading || isMinting}>
                    Tokenize Asset
                </button>
            </form>
        </div>
    );
};

export default MintNFT;

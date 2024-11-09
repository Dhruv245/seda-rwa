"use client";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MyTokenAbi from "../app/MyTokenAbi.json";
import styles from './index.module.css';
import { useAccount } from '@particle-network/connectkit';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  const { isConnected, chain } = useAccount();
  const contractAddress = "0x150D43a900b29f71eDc6793fcc48E6B507C22BDb";

  interface Listing {
    tokenId: number;
    seller: string;
    price: ethers.BigNumberish;
    isListed: boolean;
    imageUrl?: string;
    name?: string;
  }

  const ListedNFTs: React.FC = () => {
    const [listedNFTs, setListedNFTs] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [purchaseInProgress, setPurchaseInProgress] = useState(false);
    const [selectedNFT, setSelectedNFT] = useState<Listing | null>(null);

    const fetchListedNFTs = async () => {
      setLoading(true);

      const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : ethers.getDefaultProvider();

      const contract = new ethers.Contract(contractAddress, MyTokenAbi, provider);

      try {
        const rawNFTs = await contract.getListedNFTs();
        const nftsWithMetadata = await Promise.all(
          rawNFTs.map(async (nftTuple: any[]) => {
            const nft = {
              tokenId: nftTuple[0],
              seller: nftTuple[1],
              price: nftTuple[2],
              isListed: nftTuple[3],
            };

            try {
              const tokenURI = await contract.tokenURI(nft.tokenId);
              const corsFriendlyURI = tokenURI.replace("https://ipfs.infura.io/ipfs/", "https://ipfs.io/ipfs/");
              const metadataResponse = await axios.get(corsFriendlyURI);
              const metadata = metadataResponse.data;
              const imageUrl = metadata.image;
              const name = metadata.name;

              return {
                ...nft,
                imageUrl,
                price: ethers.toBigInt(nft.price),
                name,
              };
            } catch (error) {
              return nft;
            }
          })
        );
        setListedNFTs(nftsWithMetadata);
      } catch (error) {
        console.error("Error fetching listed NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    const buyNFT = async (tokenId: number) => {
      if (!selectedNFT) return;

      try {
        setPurchaseInProgress(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, MyTokenAbi, signer);

        const userBalance = await provider.getBalance(signer.getAddress());
        const nftPrice = ethers.toBigInt(selectedNFT.price);

        if (userBalance < nftPrice) {
          toast.error("Insufficient balance to complete the purchase.");
          setPurchaseInProgress(false);
          return;
        }

        const transaction = await contract.buyNFT(tokenId, {
          value: nftPrice,
        });

        await transaction.wait();
        fetchListedNFTs();
      } catch (error) {
        console.error(`Failed to buy NFT with tokenId ${tokenId}:`, error);
      } finally {
        setPurchaseInProgress(false);
        setSelectedNFT(null);
      }
    };

    const handleCardClick = (nft: Listing) => {
      if (purchaseInProgress) return;
      setSelectedNFT(nft);
      buyNFT(nft.tokenId);
    };

    useEffect(() => {
      fetchListedNFTs();
    }, [isConnected, chain]);

    return (
      <div className={styles.container}>
        <ToastContainer />
        <h1 className={styles.title}>Listed Assets</h1>
        {loading ? (
          <p>Loading...</p>
        ) : listedNFTs.length === 0 ? (
          <p>No Item listed for sale.</p>
        ) : (
          <div className={styles.grid}>
            {listedNFTs.map((nft) => (
              <div
                key={nft.tokenId}
                className={`${styles.card} ${purchaseInProgress ? styles.disabledCard : ""}`}
                onClick={() => handleCardClick(nft)}
              >
                {purchaseInProgress && selectedNFT?.tokenId === nft.tokenId ? (
                  <div className={styles.spinner}></div> // Spinner shown on selected card during purchase
                ) : (
                  <>
                    {nft.imageUrl ? (
                      <img src={nft.imageUrl} alt={`NFT ${nft.tokenId}`} className={styles.image} />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div className={styles.details}>
                      <h2 className={styles.nftTitle}>{nft.name || `NFT #${nft.tokenId}`}</h2>
                      <p className={styles.seller} title={nft.seller}>Seller: {nft.seller}</p>
                      <p className={styles.price}>Price: {ethers.formatEther(nft.price)} ETH</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {purchaseInProgress && (
          <div className={styles.loader}>Processing your purchase...</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <ListedNFTs />
    </div>
  );
}

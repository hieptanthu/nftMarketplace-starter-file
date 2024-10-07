// src/ContractContext.js

import React from "react";
import { useState } from "react";
import axios from "axios";
import { nftMarketplaceAddress, nftMarketplaceABI } from "./constants";
import Web3Modal from "web3modal";
import Web3 from "web3";

async function uploadToNFTStorage(fileData) {
  const fromData = new FormData();
  fromData.append("file", fileData);

  const response = await axios({
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data: fromData,
    headers: {
      pinata_api_key: `da91802aa3accdffd5ef`,
      pinata_secret_api_key: `9730ed98f26704e345c35ed0e5e290f2ec98583a7b20b4dde8e09a382018e770`,
    },
  });

  const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  return ImgHash;
}

export const useContract = React.createContext();

export const ContractProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  //CONNECTING WITH SMART CONTRACT
  const connectingWithSmartContract = async () => {
    // Kết nối ví thông qua Web3Modal
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    // Tạo instance Web3.js từ kết nối
    const web3 = new Web3(connection);
    // Khởi tạo hợp đồng smart contract với Web3.js
    const nftMarketplaceContract = new web3.eth.Contract(
      nftMarketplaceABI, // ABI của hợp đồng
      nftMarketplaceAddress // Địa chỉ của hợp đồng
    );

    // Ví dụ lấy tên hợp đồng (nếu hàm 'name' tồn tại)
    // const name = await nftMarketplaceContract.methods.name().call();
    // console.log("Contract name:", name);

    return nftMarketplaceContract;
    try {
    } catch (error) {
      console.log("not connect to smart contract");
    }
  };

  //  Connecting Wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      setAccount(accounts[0]);

      window.location.reload();
    } catch (error) {
      console.log("SomeTing Went connecting With wallet");
    }
  };

  // check If Wallet Connected
  const checkIfWalletConnected = async () => {
    try {
      const test = connectingWithSmartContract();
      console.log(test);
      if (!window.ethereum) return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(accounts[0]);
      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.log("SomeTing Went connecting With wallet");
    }
  };

  //create Function

  return (
    <useContract.Provider
      value={{
        account,
        checkIfWalletConnected,
        connectWallet,
        connectingWithSmartContract,
        uploadToNFTStorage,
      }}
    >
      {children}
    </useContract.Provider>
  );
};

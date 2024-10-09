import React, { useState, useContext } from "react";
import component from "../components";
import { Container } from "react-bootstrap";
import { useContract } from "../context/NFTMarketplaceContext";
import myNFTapi from "../api/myNFTapi";
export default function myNFT() {
  const { account } = useContext(useContract);
  const [nfts, setNFTs] = useState(null);

  const [type, setType] = useState(["", "sell", "Auction"]);

  useState(() => {
    const query = { ownerId: account };
    async function getData() {
      const data = await myNFTapi.get(query);
      setNFTs(data);
      console.log(data);
    }

    getData();
  }, [account]);
  return (
    <div>
      {nfts != null ? (
        <Container>{component.product.ListProduct(nfts, "")}</Container>
      ) : (
        <></>
      )}
    </div>
  );
}

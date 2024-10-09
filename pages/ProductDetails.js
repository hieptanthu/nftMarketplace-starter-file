import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import component from "../components";
import { Container } from "react-bootstrap";
import myNFTapi from "../api/myNFTapi";
import { useContract } from "../context/NFTMarketplaceContext";
const ProductDetails = () => {
  const { account, connectingWithSmartContract } = useContext(useContract);
  const router = useRouter();
  const { tokenId, type } = router.query; // Lấy tham số id từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function callApi() {
      const dataOut = await myNFTapi.getById(tokenId);
      if (dataOut) {
        setProduct(dataOut);
      }
    }
    if (tokenId) {
      callApi();
    }
  }, [tokenId]);

  return (
    <>
      {product != null ? (
        <div>
          {component.product.ProductDetailL({
            data: product,
            type: type,
            account: account,
            contract: connectingWithSmartContract,
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductDetails;

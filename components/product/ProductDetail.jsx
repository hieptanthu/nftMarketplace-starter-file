import { Col, Container, Row } from "react-bootstrap";
import Style from "./style.module.css";
import ProductImg from "./ProductImg";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { useEffect, useState, useContext } from "react";
import ModalSell from "./ModalSell";
import Web3 from "web3";
import { useContract } from "../../context/NFTMarketplaceContext";

function ProductDetail({ state }) {
  const { connectingWithSmartContract } = useContext(useContract);
  const [product, setProduct] = useState({});
  const [productType, setProductType] = useState("");
  const [account, setAccount] = useState("");
  const [showSell, setShowSell] = useState(false);

  useEffect(() => {
    setProduct(state.data);
    setProductType(state.type);
    setAccount(state.account);
  }, [state]);

  const sell = async (data) => {
    const contract = await connectingWithSmartContract();
    if (!contract) {
      return console.error("Contract is not initialized");
    }

    const web3 = new Web3(window.ethereum);

    try {
      const transaction = await contract.methods
        .createSell(BigInt(product.tokenId), BigInt(data))
        .send({
          from: account,
          value: web3.utils.toWei("0.00010", "ether"),
          gas: 300000,
          gasPrice: web3.utils.toWei("10", "gwei"),
        });
      console.log("Transaction successful:", transaction);
    } catch (error) {
      console.error("Transaction failed:", error);
      console.error(
        "Transaction error details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      {showSell ? (
        <ModalSell
          show={showSell}
          dataOut={sell}
          handleClose={() => {
            setShowSell(!showSell);
          }}
        />
      ) : (
        <></>
      )}
      <div className={Style.productDetailContainer}>
        <div className={Style.productDetailBackground}>
          <img
            src="https://c.pxhere.com/images/03/bd/45d44ff74597ecf4d69dbd92d890-1448495.jpg!d"
            alt=""
          />
        </div>
        <div
          style={{ zIndex: "2" }}
          className={Style.productDetailBackgroundItem}
        >
          <div className={Style.productDetailItem}>
            <Container>
              <Row style={{ textAlign: "center", alignItems: "center" }}>
                <Col xs={7}>
                  <ProductImg
                    size="xl"
                    LinkImg={
                      product?.image
                        ? product.image
                        : "https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg"
                    }
                  />
                </Col>
                <Col>
                  <div className={Style.listText}>
                    <div>
                      <samp
                        style={{
                          fontFamily: "inherit",
                          fontSize: "16px",
                          lineHeight: "20px",
                          fontWeight: 500,
                        }}
                      >
                        MINTING NOW
                      </samp>
                    </div>
                    <div>
                      <Link href={"/"} className={Style.nameProduct}>
                        {product?.title ? product.title : "title"}
                      </Link>
                    </div>
                    <div>
                      <samp style={{ color: "rgb(225 225 225,0.5)" }}>
                        By <br />
                      </samp>
                      <Link href={"/"}>
                        {product?.owner ? product.owner : "owner name"}
                      </Link>
                    </div>
                    <div>
                      <p>
                        {product?.Description
                          ? product.Description
                          : "Description"}
                      </p>
                    </div>
                    <div>
                      {product && product.owner === account ? (
                        <>
                          <Button
                            onClick={() => {
                              setShowSell(!showSell);
                            }}
                            variant="light"
                          >
                            <span>Sell</span>
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            variant="light"
                          >
                            <span>Auction</span>
                          </Button>
                        </>
                      ) : (
                        <h1>1</h1>
                      )}
                    </div>
                    <div>
                      <span>22:06:49 </span>
                      <samp>Thursday, 19 September 2024</samp>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;

import Card from "react-bootstrap/Card";
import ProductImg from "./ProductImg";
import Style from "./style.module.css";
import Link from "next/link"; // Correct import
import { Col, Row } from "react-bootstrap";
import lbr from "../../lbr";
import { useState, useEffect } from "react";

const ProductCart = ({ state }) => {
  const [product, setProduct] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    if (state) {
      setType(state.type);
      setProduct(state.product);
    }
  }, [state]);

  if (!state) {
    return null; // Avoid rendering empty fragment
  }

  return (
    <Card
      className={"s"}
      style={{ width: "284px", height: "450px", margin: "10px 10px" }}
    >
      <Card.Header
        style={{
          textAlign: "center",
          alignItems: "center",
          borderBottom: "none",
        }}
      >
        <div className={"cardImg"} style={{ marginLeft: "-5px" }}>
          <ProductImg
            size="md"
            LinkImg={
              product && product.image && product.image !== ""
                ? product.image
                : "https://mekoong.com/wp-content/uploads/2022/10/7151752393896643867-5.jpg"
            }
          />
          <Link
            href={
              "/ProductDetails/?tokenId=" + product?.tokenId + "&type=" + type
            }
          >
            <button className="btn btn-light">Product details</button>
          </Link>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ display: "flex", flexDirection: "column" }}>
          <Link href="#">
            <span
              style={{
                fontSize: "13px",
                color: "rgba(60, 54, 54, 0.7)",
                marginBottom: "5px",
              }}
            >
              by{" "}
              {lbr.string.shortenAddress(
                product && product.owner && product.owner ? product.owner : ""
              )}
            </span>
          </Link>
          <Link href="#">
            <span>
              {product && product.title ? product.title : "NFT test1"}
            </span>
          </Link>
        </Card.Title>
        <div className={"timeDown"}>
          <Row className={"timeDownText"}>
            {type === "sell" ? (
              <>
                <Col>Price</Col>
                <Col>{product?.sell}</Col>
              </>
            ) : type === "auction" ? (
              <>
                <Col>Auction</Col>
                <Col>23:11:15</Col>
              </>
            ) : (
              <Col>NFT</Col>
            )}
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCart;

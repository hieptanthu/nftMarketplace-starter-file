import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCart from "./ProductCart";

function ListProduct({ products, type }) {
  const [items, setItems] = useState(products);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {items.map((item, index) => (
        <ProductCart key={index} state={{ type: type, product: item }} />
      ))}
    </div>
  );
}

export default ListProduct;

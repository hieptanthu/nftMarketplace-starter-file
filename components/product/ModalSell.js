import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
function ModalSell({ show, dataOut, handleClose }) {
  const [inputData, setInputData] = useState(0);
  const handleSubmit = async () => {
    await dataOut(inputData); // Gửi dữ liệu ra component cha thông qua callback
  };

  return (
    <Modal style={{ marginTop: "10em" }} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Sell Nft</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <Form.Control
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value);
            }}
            aria-label="Text input with 2 dropdown buttons"
          />
          <DropdownButton
            variant="outline-secondary"
            title="Dropdown"
            id="input-group-dropdown-4"
            align="end"
          >
            <Dropdown.Item href="#">eth</Dropdown.Item>
            <Dropdown.Item href="#">btc</Dropdown.Item>
            <Dropdown.Item href="#">tron</Dropdown.Item>
            <Dropdown.Item href="#">pi</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSell;

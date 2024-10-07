import React from "react";
import { useContract } from "../context/NFTMarketplaceContext";
import { Container } from "@mui/material";
import { useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import component from "../components";
import Web3 from "web3";
import myNFTapi from "../api/myNFTapi";
import { useRouter } from "next/router";
function createNFT() {
  const { connectingWithSmartContract, account, uploadToNFTStorage } =
    useContext(useContract);
  const router = useRouter();

  const [loaging, SetLoading] = useState(false);
  const [loagingCount, SetLoadingCount] = useState(10);
  const [data, setData] = useState({
    tokenId: "",
    // category_id: null,
    title: "",
    Description: "",
    owner: "",
    show: "0",
    image: "",
  });

  const [formParams, updateFormParams] = useState({
    title: "",
    Description: "",
  });
  const [fileURL, setFileURL] = useState(
    "https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"
  );
  const [file, setFile] = useState(null);
  const [message, updateMessage] = useState("");

  const createNFTSmartContract = async (formInput, file) => {
    const { title, Description } = formInput;
    if (!title || !Description || !file || !account) {
      return console.log("Data Is Missing", title);
    }
    SetLoading(true);

    const url = await uploadToNFTStorage(file);
    if (url) {
      SetLoadingCount(40);
      const contract = await connectingWithSmartContract();
      if (!contract) {
        return console.error("Contract is not initialized");
      }
      const web3 = new Web3(window.ethereum);
      const transaction = await contract.methods
        .createToken(url, title, Description, true)
        .send({
          from: account,
          value: web3.utils.toWei("0.0001", "ether"),
        });

      const tokenCreatedEvent = transaction.events.createListMyNFT;
      if (tokenCreatedEvent) {
        SetLoadingCount(80);
        const returnValues = tokenCreatedEvent.returnValues;
        const value = {
          tokenId: returnValues[0].toString(),
          // category_id: null,
          title: returnValues[1],
          Description: returnValues[2],
          owner: returnValues[3],
          show: returnValues[4] ? 0 : 1,
          image: returnValues[5],
        };
        setData(value);
        return value;
      } else {
        console.log("TokenCreated event not found.");
      }
    }
  };
  async function disableButton() {
    const listButton = document.getElementById("list-button");
    listButton.disabled = true;
    listButton.style.backgroundColor = "grey";
    listButton.style.opacity = 0.3;
  }

  async function enableButton() {
    const listButton = document.getElementById("list-button");
    listButton.disabled = false;
    listButton.style.backgroundColor = "#A500FF";
    listButton.style.opacity = 1;
  }

  //This function uploads the NFT image to IPFS
  function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      setFile(file);
      const LinkIMG = URL.createObjectURL(file);
      disableButton();
      updateMessage("Uploading image.. please don't click anything!");
      enableButton();
      updateMessage("");
      setFileURL(LinkIMG);
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  async function Create(e) {
    e.preventDefault();
    const out = await createNFTSmartContract(formParams, file);
    if (out) {
      const portApi = await myNFTapi.post(out);
      if (portApi) {
        SetLoadingCount(100);
        SetLoading(false);
        router.push("/");
      }
    }
  }
  return (
    <Container maxWidth="xxl">
      {loaging ? component.common.load.LoadBase(loagingCount) : <></>}
      <Row>
        <Col>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            {component.product.ProductImg(fileURL, "xl")}
          </div>
        </Col>
        <Col>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2.5rem",
            }}
            id="nftForm"
          >
            <form
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.5rem",
                padding: "2rem",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#805AD5",
                  marginBottom: "2rem",
                }}
              >
                Upload your NFT to the marketplace
              </h3>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#805AD5",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                  htmlFor="name"
                >
                  NFT Name
                </label>
                <input
                  style={{
                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.25rem",
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    color: "#4a5568",
                    lineHeight: "1.25",
                  }}
                  id="name"
                  type="text"
                  placeholder="Axie#4563"
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      title: e.target.value,
                    })
                  }
                  value={formParams.name}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#805AD5",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                  htmlFor="description"
                >
                  NFT Description
                </label>
                <textarea
                  style={{
                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.25rem",
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    color: "#4a5568",
                    lineHeight: "1.25",
                    resize: "none",
                  }}
                  cols="40"
                  rows="5"
                  id="description"
                  placeholder="Axie Infinity Collection"
                  value={formParams.Description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      Description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    color: "#805AD5",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                  htmlFor="image"
                >
                  Upload Image (&lt;500 KB)
                </label>
                <input type="file" onChange={OnChangeFile} />
              </div>
              <br />
              <div style={{ textAlign: "center", color: "#f56565" }}>
                {message}
              </div>
              <button
                onClick={(e) => {
                  Create(e);
                }}
                style={{
                  fontWeight: "bold",
                  marginTop: "2.5rem",
                  width: "100%",
                  backgroundColor: "#805AD5",
                  color: "white",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                id="list-button"
              >
                create NFT
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default createNFT;

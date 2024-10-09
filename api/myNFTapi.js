import axiosClient from "./axiosClient";

const myNFTapi = {
  get: (params) => axiosClient.get("/myNFT/", params),
  getById: (id) => axiosClient.get("/myNFT/" + id),
  put: (params) => axiosClient.put("/myNFT", params),
  post: (params) => axiosClient.post("/myNFT", params),
  delete: (params) => axiosClient.delete("/myNFT", params),
};

export default myNFTapi;

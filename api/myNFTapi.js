import axiosClient from "./axiosClient";

const myNFTapi = {
  get: () => axiosClient.get("/myNFT/"),
  getById: (id) => axiosClient.post("/myNFT/" + id),
  put: (params) => axiosClient.put("/myNFT", params),
  post: (params) => axiosClient.post("/myNFT", params),
  delete: (params) => axiosClient.delete("/myNFT", params),
};

export default myNFTapi;

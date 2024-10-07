import axios from "axios";
import queryString from "query-string";

const baseUrl = "http://localhost:5000/";

const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify(params),
});

// Interceptor to add the authorization header
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get the token
    if (token) {
      // Add the token to the headers if it exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json"; // Set content type
    return config; // Return the modified config
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Interceptor to handle responses
axiosClient.interceptors.response.use(
  (response) => {
    // Return the data if response exists
    return response.data;
  },
  (error) => {
    // Handle errors
    if (!error.response) {
      console.error("Network Error:", error.message);
      alert("Network error occurred. Please try again.");
    } else {
      console.error("Error Response:", error.response);
      // Handle other types of errors based on status or response data
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axiosClient;

import axios from "axios";

// Create an Axios instance
const http = axios.create({
  baseURL: "http://localhost:7240",
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
})

export default http;

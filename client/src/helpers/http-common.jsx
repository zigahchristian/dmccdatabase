import axios from "axios";

export const serverName = "http://localhost:7240";

// Create an Axios instance
const http = axios.create({
  baseURL: serverName,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

export default http;

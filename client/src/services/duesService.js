import http from "../helpers/http-common";
import axios from "axios";

const getDuesById = async (id) => {
  try {
    const response = await http.get(`dues/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.response.status} , ${error.response?.data?.message}`;
    }
  }
};

const addDues = async (id, data) => {
  try {
    const response = await http.post(`dues/create/${id}`, data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseStatus =
        error.response === undefined ? 500 : error.response.status;
      return `${responseStatus} , ${error.response?.data?.message}`;
    }
  }
};

const updateDues = async (id, data) => {
  try {
    const response = await http.patch(`dues/${id}`, data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseStatus =
        error.response === undefined ? 500 : error.response.status;
      return `${responseStatus} , ${error.response?.data?.message}`;
    }
  }
};

const DuesService = {
  addDues,
  getDuesById,
  updateDues,
};

export default DuesService;

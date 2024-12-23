import http from "../helpers/http-common";
import axios from "axios";

const getSession = async () => {
  try {
    const response = await http.get(`users/getsession`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.response.status} , ${error.response?.data?.message}`;
    }
  }
};

const getMemberById = async (id) => {
  try {
    const response = await http.get(`members/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.response.status} , ${error.response?.data?.message}`;
    }
  }
};

const getAllMembers = async () => {
  try {
    const response = await http.get(`members/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseStatus =
        error.response === undefined ? 500 : error.response.status;
      return `${responseStatus} , ${error.response?.data?.message}`;
    }
  }
};

const addMember = async (data) => {
  try {
    const response = await http.post(`members/create`, data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseStatus =
        error.response === undefined ? 500 : error.response.status;
      return `${responseStatus} , ${error.response?.data?.message}`;
    }
  }
};

const updateMember = async (data, id) => {
  try {
    const response = await http.patch(`members/${id}`, data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseStatus =
        error.response === undefined ? 500 : error.response.status;
      return `${responseStatus} , ${error.response?.data?.message}`;
    }
  }
};

const addBulkMembers = async (data) => {
  try {
    const response = await http.get(`members/newBulkMembersUpload`, data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseStatus =
        error.response === undefined ? 500 : error.response.status;
      return `${responseStatus} , ${error.response?.data?.message}`;
    }
  }
};

const loginUser = async (data) => {
  try {
    const response = await http.post(`users/auth/login`, data);
    console.log(response.status);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response.status;
    }
  }
};

const getProfile = async (id) => {
  try {
    const response = await http.get(`/profile/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.response.status} , ${error.response?.data?.message}`;
    }
  }
};

const logout = async () => {
  try {
    const response = await http.get(`/users/auth/logout`);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response.status;
    }
  }
};

const MemberService = {
  addMember,
  addBulkMembers,
  updateMember,
  getMemberById,
  getAllMembers,
};

export default MemberService;

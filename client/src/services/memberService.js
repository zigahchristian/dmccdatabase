import http from "../helpers/http-common";
import axios from "axios";

const getSession = async () => {
  try {
    const response = await http.get(`/users/getsession`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.response.status} , ${error.response?.data?.message}`;
    }
  }
};

const getAllUsers = async () => {
  try {
    const response = await http.get(`/users/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.response.status} , ${error.response?.data?.message}`;
    }
  }
};

const getAllMembers = async () => {
  try {
    const response = await http.get(`/members/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.response.status} , ${error.response?.data?.message}`;
    }
  }
};

const addMember = async (data, id) => {
  try {
    const response = await http.post(`/members/create/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.response.status} , ${error.response?.data?.message}`;
    }
  }
};

const loginUser = async (data) => {
  try {
    const response = await http.post(`/users/auth/login`, data);
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
  getAllUsers,
  getAllMembers,
};

export default MemberService;

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

const registerUser = async (data) => {
  try {
    const response = await http.post(`/users/auth/register`, data);
    return response.data;
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
    const response = await http.post(`/users/auth/login`, data);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response =
        error.response === undefined ? 500 : error.response.status;
      return response;
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

const AuthService = {
  registerUser,
  loginUser,
  logout,
  getSession,
  getProfile,
  getAllUsers,
  getAllMembers,
};

export default AuthService;

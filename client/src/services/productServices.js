import http from "../helpers/http-common";

const createNewProduct = (data) => {
  return http.post(`/product/create`, data);
};

const getAllProducts = () => {
  return http.get(`/product`);
};

const getProductById = (id) => {
  return http.get(`/product/${id}`);
};

const ProductService = {
  createNewProduct,
  getAllProducts,
  getProductById,
};

export default ProductService;



import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://inventory-backend-api-gqdxhzdwejf8axe4.southeastasia-01.azurewebsites.net/api";

export const getProducts = () => axios.get(`${API_URL}/products`);
export const createProduct = (product) =>
  axios.post(`${API_URL}/products`, product);
export const updateProduct = (id, product) =>
  axios.put(`${API_URL}/products/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);

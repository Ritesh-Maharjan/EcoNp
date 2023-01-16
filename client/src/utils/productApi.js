import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// create products
const createProduct = async (data, token) => {
  try {
    const resData = await axios.post(`${BASE_URL}/product/`, data, {
      headers: {
        Authorization: `Bearers ${token}`,
      },
    });
    return resData;
  } catch (err) {
    return err;
  }
};

// get all products
const getAllProducts = async (search, filter) => {
  try {
    const resData = await axios.get(
      `${BASE_URL}/product/?keyword=${search}&filter=${filter}`
    );
    return resData;
  } catch (err) {
    return err;
  }
};

// get a single product
const getProduct = async (id) => {
  try {
    const resData = await axios.get(`${BASE_URL}/product/${id}`);
    return resData;
  } catch (err) {
    return err;
  }
};

// get a single product
const getProductReview = async (id) => {
  try {
    const resData = await axios.get(`${BASE_URL}/product/reviews/${id}`);
    return resData;
  } catch (err) {
    return err;
  }
};

// submit a review
const submitReview = async (token, data) => {
  try {
    const resData = await axios.put(`${BASE_URL}/product/review`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resData;
  } catch (err) {
    return err;
  }
};

// get categories
const getCategoryApi = async () => {
  try {
    const resData = await axios.get(`${BASE_URL}/product/category`);
    return resData;
  } catch (err) {
    return err;
  }
};

export {
  createProduct,
  getAllProducts,
  getProduct,
  getProductReview,
  submitReview,
  getCategoryApi,
};

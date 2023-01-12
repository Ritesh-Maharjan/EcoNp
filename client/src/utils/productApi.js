import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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

export { createProduct };

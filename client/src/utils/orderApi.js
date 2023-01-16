import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const orderItemsApi = async (token, products) => {
  try {
    const resData = await axios.post(`${BASE_URL}/order/payment`, products, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resData;
  } catch (err) {
    return err;
  }
};

export { orderItemsApi };

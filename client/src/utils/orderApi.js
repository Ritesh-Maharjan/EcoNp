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

// create order
const createOrder = async (order, token) => {
  try {
    const resData = await axios.post(`${BASE_URL}/order/new`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resData;
  } catch (err) {
    return err;
  }
};

// get all users order
const getAllOrder = async (token) => {
  try {
    const resData = await axios.get(`${BASE_URL}/order/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resData;
  } catch (err) {
    return err;
  }
};

// get all order
const getAllOrderByAdmin = async (token) => {
  try {
    const resData = await axios.get(`${BASE_URL}/order/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resData;
  } catch (err) {
    return err;
  }
};

// update order status
const updateStatus = async (token, id, status) => {
  try {
    const resData = await axios.put(
      `${BASE_URL}/order/updatestatus/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resData;
  } catch (err) {
    return err;
  }
};

// delete order status
const deleteOrder = async (token, id) => {
  try {
    const resData = await axios.delete(`${BASE_URL}/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resData;
  } catch (err) {
    return err;
  }
};

export {
  orderItemsApi,
  createOrder,
  getAllOrder,
  getAllOrderByAdmin,
  updateStatus,
  deleteOrder,
};

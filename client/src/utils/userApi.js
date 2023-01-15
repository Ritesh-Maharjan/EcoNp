import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const createUser = async (user) => {
  try {
    const resData = await axios.post(`${BASE_URL}/user/registration`, user);
    return resData;
  } catch (err) {
    return err;
  }
};

const loginUser = async (user) => {
  try {
    const resData = await axios.post(`${BASE_URL}/user/login`, user);
    return resData;
  } catch (err) {
    return err;
  }
};

const changeEmailApi = async (token, email) => {
  try {
    const resData = await axios.put(
      `${BASE_URL}/user/me/update/email`,
      { email },
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

const changePasswordApi = async (token, data) => {
  try {
    const resData = await axios.put(
      `${BASE_URL}/user/me/update/password`,
      data,
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

const deleteUser = async (token, data) => {
  try {
    const resData = await axios.delete(`${BASE_URL}/user/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resData;
  } catch (err) {
    return err;
  }
};

export { createUser, loginUser, changeEmailApi, changePasswordApi, deleteUser };

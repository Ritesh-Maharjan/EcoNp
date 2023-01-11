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

export { createUser, loginUser };

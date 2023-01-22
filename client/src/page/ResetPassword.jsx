import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../redux/slicer/userSlice";
import { resetPassword } from "../utils/userApi";

const ResetPassword = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePassword = async () => {
    if (password.length < 7) {
      setError("Password should be of 8 character");
    } else {
      if (password === confirmPassword) {
        const data = {
          password,
          confirmPassword,
        };
        const resData = await resetPassword(params.token, data);
        if (resData.data?.sucess) {
          console.log("asdasd");
          setMsg("Password changed successfully");
          dispatch(login([resData.data.token, resData.data.user]));
          navigate("/");
        } else {
          setError(resData.response?.data?.message);
        }
      } else {
        setError("Password and confirm password doesn't match");
      }
    }
  };

  return (
    <main className="">
      <div className="flex flex-col items-center justify-center min-h-[90vh] gap-2">
        {error && <p className="text-red-400 text-center my-2">{error}</p>}
        {msg && <p className="text-green-400 text-center my-2">{msg}</p>}
        <div className="flex flex-col">
          <label htmlFor="password" className="mr-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Please enter password:"
            className="px-2 text-black"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
              setMsg("");
            }}
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="password" className="">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Please enter confirmPassword:"
            className="px-2 text-black"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
              setMsg("");
            }}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={changePassword}
        >
          Change password
        </button>
      </div>
    </main>
  );
};

export default ResetPassword;

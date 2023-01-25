import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../component/Popup";
import { getAlert, getPopup, togglePopup, toggleAlert } from "../redux/slicer/popupSlice";
import { getToken, getUser, logout } from "../redux/slicer/userSlice";
import {
  changeEmailApi,
  changePasswordApi,
  deleteUser,
} from "../utils/userApi";
import Alert from "../component/Alert";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(useSelector(getUser));
  const token = useSelector(getToken);
  const popup = useSelector(getPopup);
  const alert = useSelector(getAlert);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [deleteAccPasswordError, setDeleteAccPasswordError] = useState("");

  const changeEmail = async () => {
    if (email.length > 3) {
      const resData = await changeEmailApi(token, email);
      if (resData.data?.sucess) {
        setEmailError("");
        setEmail("")
        dispatch(toggleAlert(true));

        setTimeout(() => {
          dispatch(toggleAlert(false))
        }, 5000)
      } else {
        setEmailError(resData.response.data.message);
      }
    } else {
      setEmailError("Email is required");
    }
  };

  const changePassword = async () => {
    if (
      oldPassword.length > 7 &&
      newPassword.length > 7 &&
      confirmPassword.length > 7
    ) {
      if (newPassword !== confirmPassword) {
        setPasswordError("New password and confirm password is not same");
      } else {
        const data = {
          oldPassword,
          newPassword,
          confirmPassword,
        };
        const resData = await changePasswordApi(token, data);
        if (resData.data?.sucess) {
          setPasswordError("");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          dispatch(toggleAlert(true));

          setTimeout(() => {
            dispatch(toggleAlert(false))
          }, 5000)
        } else {
          setPasswordError(resData.response.data.message);
        }
      }
    } else {
      setPasswordError(
        "All password field is required and should be 8 characters"
      );
    }
  };

  const deleteAcc = async () => {
    const resData = await deleteUser(token);
    if (resData.data?.sucess) {
      setDeleteAccPasswordError("");
      navigate("/");
      dispatch(logout());
      dispatch(togglePopup());
    } else {
      setDeleteAccPasswordError(resData.response?.data?.message);
      dispatch(togglePopup());
    }
  };

  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center p-5 gap-2">
      {popup && (
        <Popup
          text="Are you sure you want to delete this account?"
          actionFunc={deleteAcc}
        />
      )}
      {
        alert && <Alert text="Successfully updated" />
      }
      <div className="w-full max-w-sm">
        <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 gap-2 text-gray-800 ">
          <form
            className="flex flex-col gap-1"
            onSubmit={(e) => e.preventDefault()}
          >
            {emailError && <p className="text-red-500">{emailError}</p>}
            <label htmlFor="email">Change Email:</label>
            <input
              type="email"
              placeholder={user?.email}
              className=" border-2 p-1"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-blue-400 p-1" onClick={changeEmail}>
              Change email
            </button>
          </form>

          {/* Passowrd */}
          <form
            className="flex flex-col gap-1"
            onSubmit={(e) => e.preventDefault()}
          >
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <label>Change Password:</label>
            <input
              type="password"
              placeholder="Old password"
              className=" border-2 p-1"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              className=" border-2 p-1"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Retype new password"
              className=" border-2 p-1"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="bg-blue-400 py-1"
              onClick={(e) => changePassword()}
            >
              Change password
            </button>
          </form>
          <form
            className="flex flex-col gap-1"
            onSubmit={(e) => e.preventDefault()}
          >
            {deleteAccPasswordError && (
              <p className="text-red-500">{deleteAccPasswordError}</p>
            )}
            <label htmlFor="deleteAcc">Delete Account:</label>

            <button
              className="bg-red-400 py-1"
              onClick={() => dispatch(togglePopup())}
            >
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;

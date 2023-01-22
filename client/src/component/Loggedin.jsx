import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getToken } from "../redux/slicer/userSlice";

const ProtectedRoute = () => {
  const token = useSelector(getToken);

  if (token) {
    return <Outlet />;
  } else {
    return (
      <div>
        <div className="flex flex-col justify-center items-center h-[90vh] text-center gap-4">
          <h1 className="text-red-800 font-black text-lg md:text-3xl">
            You are not logged in, Please log in
          </h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-20">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    );
  }
};

export default ProtectedRoute;

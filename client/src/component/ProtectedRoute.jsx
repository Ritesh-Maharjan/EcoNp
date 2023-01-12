import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUser } from "../redux/slicer/userSlice";

const ProtectedRoute = () => {
  const user = JSON.parse(useSelector(getUser));

  if (user?.role === "admin") {
    return <Outlet />;
  } else {
    return (
      <div>
        <div className="flex flex-col justify-center align-center h-[90vh] text-center text-3xl">
          <h1 className="text-red-800 font-black">
            You are not authorized to view this page
          </h1>
        </div>
      </div>
    );
  }
};

export default ProtectedRoute;

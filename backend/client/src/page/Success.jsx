import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import { getOrder } from "../redux/slicer/orderSlice";
import { getToken } from "../redux/slicer/userSlice";
import { createOrder } from "../utils/orderApi";

const Success = () => {
  const order = useSelector(getOrder);
  const token = useSelector(getToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createOrderApi = async () => {
      await createOrder(order, token);
      localStorage.removeItem("order");
      setLoading(false);
    };
    createOrderApi();
  }, [order, token]);
  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center  h-[90vh] gap-4">
          <h1>Your payment has been successful!!</h1>
          <Link to="/orders">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Your Orders
            </button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Success;

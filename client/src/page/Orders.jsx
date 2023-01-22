import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/Loading";
import Popup from "../component/Popup";
import { getPopup, togglePopup } from "../redux/slicer/popupSlice";
import { getToken, getUser } from "../redux/slicer/userSlice";
import {
  deleteOrder,
  getAllOrder,
  getAllOrderByAdmin,
  updateStatus,
} from "../utils/orderApi";

const Orders = () => {
  const token = useSelector(getToken);
  const user = JSON.parse(useSelector(getUser));
  const popup = useSelector(getPopup);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState();
  const [status, setStatus] = useState("Processing");
  const statusOptions = ["Processing", "Shipped", "Delivered"];
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const getAllOrdersApi = async () => {
      if (user?.role === "user") {
        const resData = await getAllOrder(token);
        if (resData.data?.success) {
          setLoading(false);
          setOrderData(resData.data.order);
        }
      } else {
        const resData = await getAllOrderByAdmin(token);
        if (resData.data?.success) {
          setLoading(false);
          setOrderData(resData.data.order);
        }
      }
    };

    getAllOrdersApi();
  }, [token, user?.role, deleted]);

  const updateOrderApi = async (id) => {
    const resData = await updateStatus(token, id, status);
    if (resData.data?.success) {
      console.log("Updated Successfully");
    }
  };

  const deleteOrderApi = async (id) => {
    const resData = await deleteOrder(token, id);
    console.log(resData);
    dispatch(togglePopup());
    setDeleted(!deleted);
  };

  return (
    <main className="min-h-[90vh] flex flex-col items-center py-6">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
          {orderData.map((el) => {
            return (
              <div
                className="border-2 flex flex-col gap-2 px-5 py-4"
                key={el._id}
              >
                {popup ? (
                  <Popup
                    text={"Are you sure you want to delete this order?"}
                    actionFunc={() => deleteOrderApi(el._id)}
                  />
                ) : (
                  <div className="flex flex-col gap-2">
                    <h1>ID: {el._id}</h1>
                    <h1>
                      Status:
                      {user?.role === "user" ? (
                        el.orderStatus
                      ) : (
                        <select
                          name="status"
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-36 text-gray-700 border-2 rounded-md"
                        >
                          {statusOptions.map((el) => {
                            return (
                              <option
                                name="status"
                                value={el}
                                className="rounded-md text-black"
                                key={el}
                              >
                                {el}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </h1>
                  </div>
                )}
                <div>
                  {el.orderItems.map((item) => {
                    return (
                      <div className="flex flex-col gap-2" key={item._id}>
                        <img
                          className=" w-40 h-40"
                          src={item.image}
                          alt="product"
                        />
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: ${item.price}</span>
                      </div>
                    );
                  })}

                  {user?.role === "admin" && (
                    <div className="flex gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={() => updateOrderApi(el._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={() => dispatch(togglePopup())}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Orders;

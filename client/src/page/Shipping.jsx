import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../redux/slicer/userSlice";
import { orderItemsApi } from "../utils/orderApi";
import { getCart } from "../redux/slicer/cartSlice";

const Shipping = () => {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const cartItems = useSelector(getCart);
  const [data, setData] = useState({
    address: "",
    city: "",
    province: [
      "NL",
      "PE",
      "NS",
      "NB",
      "QC",
      "ON",
      "MB",
      "SK",
      "BC",
      "AB",
      "YT",
      "NT",
      "NU",
    ],
    country: "",
    postalCode: "",
    phoneNo: "",
  });
  const [error, setError] = useState("");

  const onDataChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setError("");
  };

  const orderItems = async () => {
    const resData = await orderItemsApi(token, cartItems);
    console.log(resData);
    navigate(resData);
  };

  return (
    <div className="flex min-h-[90vh] py-10 items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm md:w-[450px]"
        onSubmit={(e) => orderItems(e)}
      >
        <h1 className="text-black text-center font-bold text-lg mb-4">
          Shipping Address
        </h1>

        {/* Address */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Enter address"
            name="address"
            value={data.address}
            onChange={(e) => onDataChange(e)}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City*
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="city"
            placeholder="Enter City"
            name="city"
            value={data.city}
            onChange={(e) => onDataChange(e)}
          />
        </div>

        {/* Province */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="province"
          >
            Province*
          </label>
          <select
            name="province"
            className="w-36 text-gray-700 border-2 rounded-md p-1"
          >
            {data.province.map((el) => {
              return (
                <option value={el} className="rounded-md text-black" key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            type="text"
            placeholder="Enter country"
            name="country"
            onChange={(e) => onDataChange(e)}
            value={data.country}
          />
        </div>

        {/* Postal code */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="postal"
          >
            Postal code*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="postal"
            type="number"
            placeholder="Enter postal"
            name="postal"
            onChange={(e) => onDataChange(e)}
            value={data.postal}
          />
        </div>

        {/* Phone number */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone number*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="number"
            placeholder="Enter phone"
            name="phone"
            onChange={(e) => onDataChange(e)}
            value={data.phone}
          />
        </div>

        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => orderItems(e)}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../redux/slicer/userSlice";
import { orderItemsApi } from "../utils/orderApi";
import { cartTotal, getCart } from "../redux/slicer/cartSlice";
import { setOrder } from "../redux/slicer/orderSlice";

const Shipping = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const cartItems = useSelector(getCart);
  const total = useSelector(cartTotal);
  const [data, setData] = useState({
    address: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phoneNo: "",
  });
  const [error, setError] = useState("");

  const provinceOptions = [
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
  ];
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

  const checkout = async (e) => {
    e.preventDefault();

    if (
      data.address &&
      data.city &&
      data.province &&
      data.country &&
      data.postalCode &&
      data.phoneNo
    ) {
      const resData = await orderItemsApi(token, cartItems);
      if (resData?.data?.success) {
        const shippingInfo = {
          address: data.address,
          city: data.city,
          province: data.province,
          country: data.country,
          postalCode: data.postalCode,
          phoneNo: parseInt(data.phoneNo),
        };
        const order = {
          shippingInfo,
          orderItems: cartItems,
          paymentInfo: {
            id: resData.data.data.id,
            status: resData.data.data.status,
          },
          totalPrice: { total },
        };
        dispatch(setOrder(order));
        window.location.replace(resData.data.session.url);
      } else {
        setError(resData.response.data.message);
      }
    } else {
      setError("All fieds are required");
    }
  };

  return (
    <div className="flex min-h-[90vh] py-10 items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm md:w-[450px]"
        onSubmit={(e) => checkout(e)}
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
            onChange={(e) => onDataChange(e)}
            className="w-36 text-gray-700 border-2 rounded-md p-1"
          >
            <option
              name="province"
              value=""
              className="rounded-md text-black"
            ></option>
            {provinceOptions.map((el) => {
              return (
                <option
                  name="province"
                  value={el}
                  className="rounded-md text-black"
                  key={el}
                >
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
            htmlFor="postalCode"
          >
            Postal code*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="postalCode"
            type="string"
            placeholder="Enter postalCode"
            name="postalCode"
            onChange={(e) => onDataChange(e)}
            value={data.postalCode}
          />
        </div>

        {/* Phone number */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNo"
          >
            Phone number*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNo"
            type="number"
            placeholder="Enter phoneNo"
            name="phoneNo"
            onChange={(e) => onDataChange(e)}
            value={data.phoneNo}
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
            onClick={(e) => checkout(e)}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;

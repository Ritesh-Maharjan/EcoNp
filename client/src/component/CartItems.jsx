import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/slicer/cartSlice";
import Star from "./Star";

const CartItems = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="relative flex h-[200px] justify-center gap-2 border-2 mx-2 p-2 rounded-lg">
      <div className="flex-1">
        <img
          src={data.image}
          alt="product"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-1 ">
        <h1 className="font-bold tracking-wider text-base md:text-xl">
          {data.name}
        </h1>

        {/* Star ratings */}
        <div className="flex items-center gap-2">
          <Star ratings={data.ratings} />
        </div>

        <h2 className="md:text-xl">${`${data.price}`} CAD</h2>

        {/* Quantity */}
        <div className="flex items-center gap-2">
          <button onClick={() => dispatch(increaseQuantity(data))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <span className="text-black w-12 h-8 text-center border-2 bg-white">
            {data.quantity}
          </span>
          <button
            disabled={data.quantity === 1}
            onClick={() => dispatch(decreaseQuantity(data))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </button>
        </div>

        <button
          className="bg-red-500 hover:bg-red-700 mt-1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => dispatch(removeFromCart(data))}
        >
          Remove item
        </button>
      </div>
    </div>
  );
};

export default CartItems;

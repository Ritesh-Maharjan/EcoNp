import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartTotal,
  displayCart,
  getCart,
  toggleCart,
} from "../redux/slicer/cartSlice";
import { getToken } from "../redux/slicer/userSlice";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartMenu = useSelector(toggleCart);
  const total = useSelector(cartTotal);
  const cartItems = useSelector(getCart);
  const token = useSelector(getToken);

  return (
    <aside>
      {cartMenu && (
        <div className="w-screen min-h-screen fixed flex">
          <div
            className="fixed right-0 text-red-400 z-10"
            onClick={() => dispatch(displayCart())}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <section
            className="bg-black opacity-80 w-full"
            onClick={() => dispatch(displayCart())}
          ></section>

          <section className="min-h-full w-screen fixed overflow-scroll no-scrollbar max-w-screen md:max-w-md bg-gray-800 flex flex-col gap-4 items-center top-0 bottom-0 right-0 text-lg py-20">
            <h1 className="mt-10">Your Cart Items</h1>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((el) => {
                  return <CartItems data={el} key={el.product} />;
                })}
                <p>Your cart total is ${total.toFixed(2)}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={() => dispatch(displayCart())}
                >
                  {token ? (
                    <Link to="/shipping">Checkout</Link>
                  ) : (
                    <Link to="/login">Please login</Link>
                  )}
                </button>
              </>
            ) : (
              <p>Your cart looks empty!!</p>
            )}
          </section>
        </div>
      )}
    </aside>
  );
};

export default Cart;

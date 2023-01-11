import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayCart, toggleCart } from "../redux/slicer/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartMenu = useSelector(toggleCart);

  return (
    <aside className="w-screen h-screen fixed flex ">
      {cartMenu && (
        <>
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

          <section className="bg-black opacity-80 w-full"></section>

          <section className="h-full w-screen absolute max-w-screen md:max-w-md bg-gray-800 flex flex-col gap-4 items-center right-0 text-lg">
            <h1 className="mt-10">Your Cart Items</h1>
            <p>Your cart looks empty!!</p>
          </section>
        </>
      )}
    </aside>
  );
};

export default Cart;

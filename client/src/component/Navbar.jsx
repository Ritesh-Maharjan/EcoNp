import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { displayCart, totalItems } from "../redux/slicer/cartSlice";
import { getToken, getUser, logout } from "../redux/slicer/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = JSON.parse(useSelector(getUser));
  const cartItems = useSelector(totalItems);
  const [displayMenu, setDisplayMenu] = useState();
  const menuButton = useRef();
  const menuEl = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        displayMenu &&
        !menuButton.current?.contains(e.target) &&
        !menuEl.current?.contains(e.target)
      ) {
        setDisplayMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [displayMenu]);

  return (
    <header className="h-[10vh] bg-gray-700 sticky top-0 z-20">
      <nav className="flex h-full items-center justify-between w-[90vw] m-auto ">
        <div>
          <h1 className="font-bold text-xl md:text-2xl">
            <Link to="/">Logo</Link>
          </h1>
        </div>

        {!token ? (
          <div>
            <ul className="flex gap-2 cursor-pointer md:gap-5 md:text-lg">
              <li className="relative" onClick={() => dispatch(displayCart())}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:w-8 hover:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <div className="w-5 h-5 bg-red-400 rounded-full absolute -top-2 -right-1 flex items-center justify-center z-10">
                  {cartItems}
                </div>
              </li>
              <li className="hover:text-gray-400 hover:underline hover:text-xl">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:text-gray-400 hover:underline hover:text-xl">
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <div
              className="relative flex gap-2 cursor-pointer hover:text-xl"
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="w-5 h-5 bg-red-400 rounded-full absolute -top-2 left-3 flex items-center justify-center z-10">
                {cartItems}
              </span>
              Cart
            </div>
            <div className="relative cursor-pointer hover:text-lg">
              <div
                className="flex items-center"
                ref={menuButton}
                onClick={() => setDisplayMenu(!displayMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Account
              </div>
              {displayMenu && (
                <ul
                  ref={menuEl}
                  className="absolute rounded-lg right-0 top-10 w-24 md:w-40 flex flex-col items-between justify-between  bg-gray-700 p-2"
                >
                  <li className="hover:underline p-1">
                    <Link to="/profile" onClick={() => setDisplayMenu(false)}>
                      Profile
                    </Link>
                  </li>
                  {user.role === "admin" && (
                    <li className="hover:underline p-1">
                      <Link to="/create" onClick={() => setDisplayMenu(false)}>
                        Create Products
                      </Link>
                    </li>
                  )}
                  <li
                    className="hover:underline p-1"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

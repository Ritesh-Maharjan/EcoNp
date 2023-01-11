import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="h-[10vh] bg-gray-700 sticky top-0">
      <nav className="flex h-full items-center justify-between w-[90vw] m-auto ">
        <div>
          <h1 className="font-bold text-xl md:text-2xl">
            <Link to="/">Logo</Link>
          </h1>
        </div>
        <div>
          <ul className="flex gap-2 cursor-pointer md:gap-5 md:text-lg">
            <li className="relative">
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
                2
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
      </nav>
    </header>
  );
};

export default Navbar;

import React from "react";
import Card from "../component/Card";

const Homepage = () => {
  return (
    <div className="w-screen min-h-[90vh]">
      <div className="flex flex-col w-[90vw] m-auto">
        <form className="flex flex-col gap-4 sm:flex-row sm:items-center justify-center w-full my-8">
          <div className="flex items-center w-[280px] gap-4">
            <label htmlFor="search" className="font-bold md:text-lg">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search for items"
              id="search"
              className="w-full rounded-md p-1 bg-slate-200 text-gray-700"
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="filter" className="font-bold md:text-lg">Filter by:</label>
            <select className="w-36 text-gray-700 bg-slate-200 rounded-md p-1" id="filter" >
              <option className="rounded-md bg-slate-300">Lehenga</option>
              <option className="rounded-md bg-slate-200">Hat</option>
              <option className="rounded-md bg-slate-200">Socks</option>
            </select>
          </div>
        </form>
        <section className="flex flex-col my-4 gap-4">
          <h1 className="text-center text-lg md:text-2xl font-black underline underline-offset-8">Our Products</h1>
          <div className="flex flex-wrap gap-4 justify-center">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="">
            <ul className="flex justify-center items-center w-full flex-wrap gap-2">
              <li className="border-2 px-2">1</li>
              <li className="border-2 px-2">2</li>
              <li className="border-2 px-2">3</li>
              <li className="border-2 px-2">4</li>
              <li className="border-2 px-2">5</li>
              <li className="border-2 px-2">5</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;

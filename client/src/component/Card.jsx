import React from "react";

const Card = () => {
  return (
    <div className="max-w-[300px] rounded overflow-hidden shadow-lg bg-black">
      <img
        className="w-full h-40 object-cover object-top"
        src="https://imgs.search.brave.com/xY2pqPJQ1JtWrLLSuKjv8qcZzrgOvi4lmOJ7PI83avo/rs:fit:355:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/WjRscGRuLWtzY1RF/ZC1vcE9SQXh3SGFK/NCZwaWQ9QXBp"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-base md:text-xl mb-2">
          The Coldest Sunset
        </div>
        <p className="md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div className="px-6 py-4 flex flex-wrap gap-2 items-center justify-center">
        <div className="flex items-center gap-2 md:text-xl">
          Quantity:
          <div>
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
          </div>
          <input
            type="number"
            placeholder="1"
            className="appearance-none text-center rounded-md w-10 text-gray-700 bg-slate-200 "
            onWheel={e => {e.target.blur()}}
          />
          <div>
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
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white  px-2 md:py-2 md:px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;

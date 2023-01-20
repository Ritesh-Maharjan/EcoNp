import React from "react";
import { Link } from "react-router-dom";
import Star from "../component/Star";

const Card = ({ data }) => {
  return (
    <Link to={`product/${data._id}`}>
      <div className="w-[300px] rounded-xl overflow-hidden shadow-2xl bg-black">
        {data.images.length > 0 ? (
          <img
            className="w-full h-[250px] object-cover object-top"
            src={data?.images[0]?.url}
            alt="Sunset in the mountains"
          />
        ) : (
          <img
            className="w-full h-[250px] object-cover object-top"
            src={
              "https://imgs.search.brave.com/dFhbkHCOtMiyZ1lYDAcOXVSNCIyhL4tnvqeFy94jYhU/rs:fit:433:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/bkg2U0s0WlpjQVBs/M3hhNjBOclZ3QUFB/QSZwaWQ9QXBp"
            }
            alt="Images not found"
          />
        )}
        <div className="px-6 py-4 flex flex-col gap-2">
          <h1 className="font-bold text-base md:text-xl mb-2">{data.name}</h1>
          <Star ratings={data.ratings} />
          <p>
            <span className="mr-2 font-bold">Price:</span>${data.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

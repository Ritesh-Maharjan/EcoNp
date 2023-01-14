import React from "react";
import { Link } from "react-router-dom";
import Star from "../component/Star";

const Card = ({ data }) => {
  return (
    <Link to={`product/${data._id}`}>
      <div className="w-[300px] rounded-xl overflow-hidden shadow-2xl bg-black">
        <img
          className="w-full h-[250px] object-cover object-top"
          src={data?.images[0].url}
          alt="Sunset in the mountains"
        />
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

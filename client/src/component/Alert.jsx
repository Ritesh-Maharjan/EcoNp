import React from "react";

const Alert = ({text}) => {
  return (
    <div
      className="fixed left-2 bottom-10 flex p-4 mb-4 text-sm md:text-lg text-green-500 rounded-lg bg-white"
      role="alert"
    >
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{text}</span>
      </div>
    </div>
  );
};

export default Alert;

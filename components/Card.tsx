import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="block max-w-sm p-6  w-full border  rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700">
      {children}
    </div>
  );
};

export default Card;

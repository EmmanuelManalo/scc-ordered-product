import React from "react";
import IconServerError from "../svg/IconServerError";

const ServerError = ({ width = 120, height = 120, text }) => {
  return (
    <div className="flex justify-center items-center flex-col p-2">
      <div className="mb-3">
        <IconServerError width={width} height={height} />
      </div>
      <span className="font-bold text-gray-300 text-base">Server Error</span>
    </div>
  );
};

export default ServerError;

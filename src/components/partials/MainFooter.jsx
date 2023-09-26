import React from "react";

const MainFooter = () => {
  return (
    <div className=" p-1 py-2 fixed bottom-0 left-0 w-full text-center z-20 before:border-t-2 before:content-[''] before:bg-gray-50 before:z-10 before:absolute before:top-0 before:-left-24 before:h-full before:w-full after:border-t-2 after:content-[''] after:bg-gray-50 after:z-10 after:absolute after:top-0 after:right-0 after:h-full after:w-full">
      <p className="text-[10px] leading-none m-0 relative z-30 lg:pl-48">
        © 2023 All Rights Reserved. | Powered by
        <span className="font-bold text-alert/90">
          {" "}
          Frontline Business Solutions, Inc..
        </span>
      </p>
    </div>
  );
};

export default MainFooter;

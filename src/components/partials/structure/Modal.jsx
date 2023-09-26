import React from "react";

const Modal = ({ children }) => {
  return (
    <>
      <div className="modal fixed top-0 left-0 w-full z-20">
        <div className="backdrop bg-white bg-opacity-80 h-screen "></div>
        <div className="modal__main absolute mx-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border  border-gray-400 rounded-md py-8 px-5 max-w-[420px] w-full ">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;

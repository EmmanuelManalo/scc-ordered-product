import React, { useLayoutEffect } from "react";
import { BsPersonVcard } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
// import { IoBagCheckOutline } from "react-icons/io";

import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";

const Navigation = ({ menu, submenu = null, val }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlRolePath = `${devNavUrl}`;
  const ref = React.useRef(null);

  const handleScroll = (e) => {
    console.log(e.target.scrollTop);
    dispatch(setNavHeight(e.target.scrollTop));
  };

  React.useEffect(() => {
    const nav = document.querySelector(".navigation").pageYOffset;
    console.log(nav);
  }, []);

  return (
    <div
      className="navigation px-2 py-4 bg-gray-300 h-full custom__scroll overflow-y-auto"
      ref={ref}
      onScroll={handleScroll}
    >
      <ul className="">
        <Link className="nav__link">
          <button className={`${menu === "product" ? "bg-[#ffffff]" : ""}`}>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <MdOutlineProductionQuantityLimits className="text-lg" />{" "}
                Product
              </div>
            </div>
          </button>
        </Link>
        <Link className="nav__link ">
          <button className={`${menu === "individual" ? "bg-[#ffffff]" : ""}`}>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <BsPersonVcard className="text-lg" /> Individual
              </div>
            </div>
          </button>
        </Link>
        <Link className="nav__link" to={`${urlRolePath}/transaction`}>
          <button className={`${menu === "transaction" ? "bg-[#ffffff]" : ""}`}>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <BiReceipt className="text-lg" /> Transaction
              </div>
            </div>
          </button>
        </Link>
        <Link className="nav__link" to={`${urlRolePath}/checkout`}>
          <button className={`${menu === "checkout" ? "bg-[#ffffff]" : ""}`}>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                {/* <IoBagCheckOutline className="text-lg" /> Checkout */}
              </div>
            </div>
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default Navigation;

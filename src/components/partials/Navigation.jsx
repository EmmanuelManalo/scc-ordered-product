import React, { useLayoutEffect } from "react";
import { BsPersonVcard } from "react-icons/bs";
import {
  MdOutlineProductionQuantityLimits,
  MdShoppingCartCheckout,
} from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";

const Navigation = ({ menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlRolePath = `${devNavUrl}`;
  const ref = React.useRef(null);

  const handleScroll = (e) => {
    console.log(e.target.scrollTop);
    dispatch(setNavHeight(e.target.scrollTop));
  };

  React.useEffect(() => {
    const nav = document.querySelector(".navigation").pageYOffset;
  }, []);

  return (
    <div
      className="navigation bg-gray-300 h-full custom__scroll overflow-y-auto"
      ref={ref}
      onScroll={handleScroll}
    >
      <ul className="">
        <Link className="nav__link " to={`${urlRolePath}/product`}>
          <button
            className={`${
              menu === "product" ? "bg-[#ffffff] text-primary" : ""
            }`}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <MdOutlineProductionQuantityLimits className="text-lg" />{" "}
                Product
              </div>
            </div>
          </button>
        </Link>
        <Link className="nav__link " to={`${urlRolePath}/individual`}>
          <button
            className={`${
              menu === "individual" ? "bg-[#ffffff] text-primary" : ""
            }`}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <BsPersonVcard className="text-lg" /> Individual
              </div>
            </div>
          </button>
        </Link>
        <Link className="nav__link" to={`${urlRolePath}/transaction`}>
          <button
            className={`${
              menu === "transaction" ? "bg-[#ffffff] text-primary" : ""
            }`}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <BiReceipt className="text-lg" /> Transaction
              </div>
            </div>
          </button>
        </Link>
        <Link className="nav__link" to={`${urlRolePath}/checkout`}>
          <button
            className={`${
              menu === "checkout" ? "bg-[#ffffff] text-primary" : ""
            }`}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <MdShoppingCartCheckout className="text-lg" /> Checkout
              </div>
            </div>
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default Navigation;

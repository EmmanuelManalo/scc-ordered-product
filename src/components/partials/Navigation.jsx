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
import { setIsSearch } from "../../store/StoreAction";

const Navigation = ({ menu }) => {
  const { dispatch } = React.useContext(StoreContext);
  const urlRolePath = `${devNavUrl}`;

  const handleSearchOff = () => dispatch(setIsSearch(false));

  return (
    <div className=" bg-gray-300 h-full  overflow-y-auto">
      <ul className="">
        <Link className="nav__link " to={`${urlRolePath}/product`}>
          <button
            className={`${menu === "product" ? "bg-[#ffffff] active" : ""}`}
            onClick={handleSearchOff}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center ">
                <MdOutlineProductionQuantityLimits className="text-lg" />{" "}
                Product
              </div>
            </div>
          </button>
        </Link>
        <Link className="nav__link" to={`${urlRolePath}/individual`}>
          <button
            className={`${menu === "individual" ? "bg-[#ffffff] active" : ""}`}
            onClick={handleSearchOff}
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
            className={`${menu === "transaction" ? "bg-[#ffffff] active" : ""}`}
            onClick={handleSearchOff}
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
            className={`${menu === "checkout" ? "bg-[#ffffff] active" : ""}`}
            onClick={handleSearchOff}
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

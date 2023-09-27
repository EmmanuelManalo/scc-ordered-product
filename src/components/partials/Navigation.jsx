import React from "react";
import { FaShoppingCart, FaUserAlt, FaShoppingBag } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { setIsSearch } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";

const Navigation = ({ menu }) => {
  const { dispatch } = React.useContext(StoreContext);
  const urlRolePath = `${devNavUrl}`;

  const handleSearchOff = () => dispatch(setIsSearch(false));

  return (
    <div className=" bg-gray-100 h-full overflow-y-auto">
      <Link className="nav__link " to={`${urlRolePath}/product`}>
        <button
          className={`${
            menu === "product"
              ? "bg-[#ffffff] active rounded-tl-full rounded-bl-full"
              : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
          }`}
          onClick={handleSearchOff}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center ">
              <FaShoppingBag className="text-[.9rem]" /> Product
            </div>
          </div>
        </button>
      </Link>
      <Link className="nav__link" to={`${urlRolePath}/individual`}>
        <button
          className={`${
            menu === "individual"
              ? "bg-[#ffffff] active rounded-tl-full rounded-bl-full"
              : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
          }`}
          onClick={handleSearchOff}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center ">
              <FaUserAlt className="text-[.9rem]" /> Individual
            </div>
          </div>
        </button>
      </Link>
      <Link className="nav__link" to={`${urlRolePath}/transaction`}>
        <button
          className={`${
            menu === "transaction"
              ? "bg-[#ffffff] active rounded-tl-full rounded-bl-full"
              : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
          }`}
          onClick={handleSearchOff}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center ">
              <IoReceiptSharp className="text-[.9rem]" /> Transaction
            </div>
          </div>
        </button>
      </Link>
      <Link className="nav__link" to={`${urlRolePath}/checkout`}>
        <button
          className={`${
            menu === "checkout"
              ? "bg-[#ffffff] active rounded-tl-full rounded-bl-full"
              : "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
          }`}
          onClick={handleSearchOff}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center ">
              <FaShoppingCart className="text-[.9rem]" /> Checkout
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Navigation;

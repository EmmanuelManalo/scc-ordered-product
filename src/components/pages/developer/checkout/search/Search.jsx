import React from "react";
import {
  getRemaningQty,
  handleClick,
  handleSearch,
} from "./functions-checkout-search";
import { InputSearch } from "../../../../helpers/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { pesoSign } from "../../../../helpers/functions-general";
import useQueryData from "../../../../custom-hooks/useQueryData";
import Nodata from "../../../../partials/Nodata";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";

const Search = ({
  label,
  name,
  disabled,
  endpoint,
  setSearch,
  setIsSearch,
  handleSearchModal,
  setLoading,
  setData,
  search,
  isSearch,
  loading,
  data,
  setId,
}) => {
  return (
    <>
      <InputSearch
        label={label}
        type="text"
        disabled={disabled}
        name={name}
        onChange={(e) =>
          handleSearch(e, setSearch, setIsSearch, setLoading, endpoint, setData)
        }
        value={search}
        placeholder="Search..."
        onClick={() => handleSearchModal()}
      />

      {isSearch && loading && (
        <span className="absolute top-1/2 right-0 -translate-x-1/2 mr-2">
          <ButtonSpinner color="stroke-primary" />
        </span>
      )}

      {isSearch && (
        <ul className="absolute z-50 h-40 max-h-40 overflow-y-auto top-16 w-full bg-gray-100 shadow-3xl rounded-md custom__scroll">
          {loading ? (
            <li className="p-2 h-full w-full flex items-center justify-center bg-gray-200  focus:bg-gray-200 ">
              <FetchingSpinner />
            </li>
          ) : data.length > 0 ? (
            data.map((item, key) => (
              <button
                type="button"
                className="p-2 w-full text-left bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 cursor-pointer duration-200 "
                key={key}
                onClick={() =>
                  handleClick(
                    `${item.name}`,
                    item.id,
                    setSearch,
                    setIsSearch,
                    setId
                  )
                }
              >
                {item.name} {item.price !== undefined && pesoSign}
                {item.price !== undefined &&
                  ` ${Number(item.price).toFixed(2)} (${item.qty} pcs)`}
              </button>
            ))
          ) : (
            <li className="h-full p-2 w-full flex items-center justify-center bg-gray-100  focus:bg-gray-200 ">
              <Nodata width={80} height={80} textSize="text-sm" />
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Search;

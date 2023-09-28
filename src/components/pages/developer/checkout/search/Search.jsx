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
  const { data: transactionGroupByProdctId } = useQueryData(
    `/v1/controllers/developer/checkout/group-by-transactions-product-id.php`, // endpoint
    "get", // method
    "transactionGroupByProdctId" // key
  );

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
        <ul className="absolute z-50 max-h-32 overflow-y-auto top-16 w-full bg-white shadow-3xl rounded-md">
          {loading ? (
            <li className=" p-2 w-full text-center bg-gray-100  focus:bg-gray-200 border-b border-gray-200">
              Loading...
            </li>
          ) : data.length > 0 ? (
            data.map((item, key) => (
              <button
                type="button"
                className="p-2 w-full text-center bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 cursor-pointer duration-200 border-b border-gray-200"
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
                  ` ${Number(item.price).toFixed(2)} (${getRemaningQty(
                    transactionGroupByProdctId,
                    item
                  )} pcs)`}
              </button>
            ))
          ) : (
            <li className=" p-2 w-full text-center bg-gray-100  focus:bg-gray-200 border-b border-gray-200">
              No data
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Search;

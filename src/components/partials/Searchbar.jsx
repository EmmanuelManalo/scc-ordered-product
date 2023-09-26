import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  setError,
  setIsSearch,
  setMessage,
  setValidate,
} from "../../store/StoreAction";

const Searchbar = ({ search, dispatch, store, result, isFetching }) => {
  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch(setIsSearch(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = search.current.value;

    if (val === " " || val === "") {
      dispatch(setIsSearch(false));
      dispatch(setValidate(true));
      dispatch(setMessage("Search keyword cannot be space only or blank."));
    } else {
      dispatch(setIsSearch(true));
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="searchbar relative mb-2 flex items-center">
          <input
            type="search"
            placeholder="Search here..."
            ref={search}
            className="searchbar rounded-tr-none rounded-br-none border-r-0 text-sm py-[0px] h-[40px]"
            onChange={(e) => handleChange(e)}
          />
          <button className="text-[16px] flex justify-center items-center w-[40px] h-[40px] py-[5px] rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md border-l-0 bg-gray-200 text-white border-primary hover:bg-primary">
            <FaSearch />
          </button>
          {store.isSearch && (
            <span className="absolute top-[10px] right-24">
              Result: {isFetching ? "Searching..." : result?.[0].count}
            </span>
          )}
        </div>
      </form>
    </>
  );
};

export default Searchbar;

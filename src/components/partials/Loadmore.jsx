import React from "react";
import ButtonSpinner from "./spinners/ButtonSpinner";

const Loadmore = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  result,
  setPage,
  page,
  refView,
}) => {
  if (page === result?.total_pages) {
    return (
      <>
        {isFetchingNextPage ? (
          <button type="button" className="btn mx-auto mt-5 w-32">
            {isFetchingNextPage ? <ButtonSpinner /> : "Load More"}
          </button>
        ) : (
          <div className="loadmore mt-8 mb-0 p-1.5 text-center">
            End of list.
          </div>
        )}
      </>
    );
  }

  if (hasNextPage) {
    return (
      <button
        ref={refView}
        type="button"
        onClick={() => {
          setPage((prev) => prev + 1);
          fetchNextPage();
        }}
        className="btn mx-auto mt-5 mb-3 w-32"
      >
        {!isFetchingNextPage ? <span>Load more</span> : <ButtonSpinner />}
      </button>
    );
  }
};

export default Loadmore;

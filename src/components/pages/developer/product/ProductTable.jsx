import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { useInView } from "react-intersection-observer";
import Searchbar from "../../../partials/Searchbar";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import TableLoading from "../../../partials/TableLoading";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
  setIsSearch,
} from "../../../../store/StoreAction";
import Loadmore from "../../../partials/Loadmore";
import RecordCount from "../../../partials/RecordCount";
import { getProductCountRecord } from "./functions-product";
import useQueryData from "../../../custom-hooks/useQueryData";
import Nodata from "../../../partials/Nodata";
import ServerError from "../../../partials/ServerError";
import { MdRestore } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiArchive, FiEdit3 } from "react-icons/fi";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalDeleteAndRestore from "../../../partials/modals/ModalDeleteAndRestore";
import Pills from "../../../partials/Pills";
import { pesoSign } from "../../../helpers/functions-general";

const ProductTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  const { ref, inView } = useInView();

  let counter = 1;

  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["product", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/product/search.php`, // search endpoint
        `/v1/controllers/developer/product/page.php?start=${pageParam}`, // list endpoint // list endpoint
        store.isSearch, // search boolean
        "post",
        { search: search.current.value }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: true,
  });

  const { data: product } = useQueryData(
    `/v1/controllers/developer/product/product.php`,
    "get",
    "product"
  );

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.product_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.product_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.product_aid);
    setData(item);
    setDel(true);
  };
  return (
    <>
      <Searchbar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
      />
      <RecordCount
        record={
          store.isSearch ? result?.pages[0].count : result?.pages[0].total
        }
        status={getProductCountRecord(
          store.isSearch ? result?.pages[0] : product
        )}
      />
      <div className="table__wrapper relative rounded-md shadow-md overflow-auto mb-8">
        {isFetching && status !== "loading" && <TableSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th width={"100px"}>Status</th>
              <th width={"100px"}>Name</th>
              <th width={"100px"}>Quantity</th>
              <th>Price</th>
              <th className="action lg:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {status === "loading" ? (
                    <TableLoading count={20} cols={3} />
                  ) : (
                    <Nodata />
                  )}
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{counter++}.</td>
                      <td>
                        {item.product_is_active === 1 ? (
                          <Pills label="Active" />
                        ) : (
                          <Pills label="Inactive" tc="text-archive" />
                        )}
                      </td>
                      <td>{item.product_name}</td>
                      <td>{item.product_quantity}</td>
                      <td className="flex items-center gap-1">
                        {pesoSign}
                        {Number(item.product_srp).toFixed(2)}
                      </td>
                      <td
                        className="table__action top-0 right-5 "
                        data-ellipsis=". . ."
                      >
                        {item.product_is_active === 1 ? (
                          <ul className=" flex items-center  gap-4 bg-">
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                <FiEdit3 />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Archive"
                                onClick={() => handleArchive(item)}
                              >
                                <FiArchive />
                              </button>
                            </li>
                          </ul>
                        ) : (
                          <ul className="flex items-center gap-4">
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Delete"
                                onClick={() => handleDelete(item)}
                              >
                                <RiDeleteBinLine />
                              </button>
                            </li>
                            <li>
                              <button
                                className="tooltip"
                                data-tooltip="Restore"
                                onClick={() => handleRestore(item)}
                              >
                                <MdRestore />
                              </button>
                            </li>
                          </ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Loadmore
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        result={result?.pages[0]}
        setPage={setPage}
        page={page}
        refView={ref}
      />
      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/v1/controllers/developer/product/active.php?productId=${id}`}
          msg={`Are you sure you want to archive this product?`}
          item={dataItem.product_name}
          queryKey={"product"}
        />
      )}
      {store.isRestore && (
        <ModalDeleteAndRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/controllers/developer/product/product.php?productId=${id}`}
          mysqlApiRestore={`/v1/controllers/developer/product/active.php?productId=${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this product?"
              : "Are you sure you want to restore this product?"
          }
          item={dataItem.product_name}
          queryKey={"product"}
        />
      )}
    </>
  );
};

export default ProductTable;

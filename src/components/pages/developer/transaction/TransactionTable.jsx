import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbCurrencyPeso } from "react-icons/tb";
import Nodata from "../../../partials/Nodata";
import Pills from "../../../partials/Pills";
import Searchbar from "../../../partials/Searchbar";
import ServerError from "../../../partials/ServerError";
import TableLoading from "../../../partials/TableLoading";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalDeleteAndRestore from "../../../partials/modals/ModalDeleteAndRestore";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import TransactionCount from "./TransactionCount";
import { StoreContext } from "../../../../store/StoreContext";
import { useInView } from "react-intersection-observer";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import useQueryData from "../../../custom-hooks/useQueryData";
import { getTransactionCountRecord } from "./functions-transaction";
import Loadmore from "../../../partials/Loadmore";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction";
import { FiEdit3 } from "react-icons/fi";
import { pesoSign } from "../../../helpers/functions-general";

const TransactionTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  // data
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 1;
  // loadmore & search
  const [page, setPage] = React.useState(1);
  const search = React.useRef("");
  const { ref, inView } = useInView();
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
    queryKey: ["transaction", search.current.value, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/transaction/search.php`, // search endpoint
        `/v1/controllers/developer/transaction/page.php?start=${pageParam}`, // list endpoint // list endpoint
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

  const { data: transaction } = useQueryData(
    `/v1/controllers/developer/transaction/transaction.php`,
    "get",
    "transaction"
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
    setId(item.transaction_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.transaction_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.transaction_aid);
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
      <TransactionCount
        record={
          store.isSearch ? result?.pages[0].count : result?.pages[0].total
        }
        status={getTransactionCountRecord(
          store.isSearch ? result?.pages[0] : transaction
        )}
      />
      <div className="table__wrapper relative rounded-md shadow-md overflow-auto mb-8">
        {isFetching && status !== "loading" && <TableSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th width={"100px"}>Status</th>
              <th width={"100px"}>Product</th>
              <th width={"200px"}>Individual</th>
              <th className="text-right min-w-[5rem] ">SRP</th>
              <th className="text-center min-w-[5rem] ">Qty</th>
              <th className="text-right min-w-[5rem] pr-5 ">Total Amount</th>
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
                        {item.transaction_is_paid === 0 ? (
                          <Pills label="unpaid" tc="text-archive" />
                        ) : (
                          <Pills label="paid" tc="text-green-600" />
                        )}
                      </td>
                      <td>{item.product_name}</td>
                      <td>
                        {item.individual_fname} {item.individual_lname}
                      </td>
                      <td className="text-right">
                        {pesoSign}
                        {Number(item.product_srp).toFixed(2)}
                      </td>
                      <td className="text-center">
                        {item.transaction_quantity}
                      </td>
                      <td className="text-right pr-5 ">
                        {pesoSign}
                        {Number(item.transaction_total).toFixed(2)}
                      </td>
                      <td
                        className="table__action top-0 right-3 "
                        data-ellipsis=". . ."
                      >
                        <ul className=" flex items-center  gap-3 ">
                          {item.transaction_is_paid === 1 ? (
                            <>
                              <li>
                                <button
                                  className="tooltip"
                                  data-tooltip="Unpay"
                                  onClick={() => handleArchive(item)}
                                >
                                  <div className="slash">
                                    <TbCurrencyPeso />
                                  </div>
                                </button>
                              </li>
                            </>
                          ) : (
                            <>
                              {/* <li>
                                <button
                                  className="tooltip"
                                  data-tooltip="edit"
                                  onClick={() => handleEdit(item)}
                                >
                                  <FiEdit3 />
                                </button>
                              </li> */}
                              <li>
                                <button
                                  className="tooltip"
                                  data-tooltip="Pay"
                                  onClick={() => handleRestore(item)}
                                >
                                  <TbCurrencyPeso />
                                </button>
                              </li>
                            </>
                          )}
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <RiDeleteBinLine />
                            </button>
                          </li>
                        </ul>
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
          mysqlApiArchive={`/v1/controllers/developer/transaction/active.php?transactionId=${id}`}
          msg={`Are you sure you want to unpay this transaction?`}
          item={dataItem.transaction_name}
          queryKey={"transaction"}
          title="Pay"
        />
      )}
      {store.isRestore && (
        <ModalDeleteAndRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/controllers/developer/transaction/transaction.php?transactionId=${id}`}
          mysqlApiRestore={`/v1/controllers/developer/transaction/active.php?transactionId=${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this transaction?"
              : "Are you sure you want to pay this transaction?"
          }
          item={dataItem.transaction_name}
          data={dataItem}
          queryKey={"transaction"}
          transaction={true}
        />
      )}
    </>
  );
};

export default TransactionTable;

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
<<<<<<< HEAD
import { useInView } from "react-intersection-observer";
import { setIsConfirm, setIsRestore } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
=======
import { FiArchive, FiEdit3 } from "react-icons/fi";
import { TbCurrencyPeso } from "react-icons/tb";
import ServerError from "../../../partials/ServerError";
>>>>>>> 6343535a629a11ad8b0a3981e688166b1dd57645
import Nodata from "../../../partials/Nodata";
import Pills from "../../../partials/Pills";
import RecordCount from "../../../partials/RecordCount";
import Searchbar from "../../../partials/Searchbar";
import ServerError from "../../../partials/ServerError";
import TableLoading from "../../../partials/TableLoading";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalDeleteAndRestore from "../../../partials/modals/ModalDeleteAndRestore";
import TableSpinner from "../../../partials/spinners/TableSpinner";
<<<<<<< HEAD
import { getTransactionCountRecord } from "./functions-transaction";
=======
import Pills from "../../../partials/Pills";
import TransactionCount from "./TransactionCount";
>>>>>>> 6343535a629a11ad8b0a3981e688166b1dd57645

const TransactionTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  // data
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 1;
  let active = 0;
  let inactive = 0;
  // loadmore & search
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
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
    queryKey: ["transaction", store.isSearch],
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
              <th>Quantity</th>
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
                  active += item.transaction_is_paid === 1;
                  inactive += item.transaction_is_paid === 0;
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
                      <td>{item.transaction_quantity}</td>
                      <td
                        className="table__action top-0 right-5 "
                        data-ellipsis=". . ."
                      >
                        <ul className=" flex items-center  gap-4 bg-">
                          {item.transaction_is_paid === 1 ? (
                            <>
                              <li>
                                <button
                                  className="tooltip"
                                  data-tooltip="Pay"
                                  onClick={() => handleArchive(item)}
                                >
                                  <TbCurrencyPeso />
                                </button>
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <button
                                  className="tooltip"
                                  data-tooltip="Unpay"
                                  onClick={() => handleRestore(item)}
                                >
                                  <div className="slash">
                                    <TbCurrencyPeso />
                                  </div>
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
          msg={`Are you sure you want to pay this transaction?`}
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
              : "Are you sure you want to unpay this transaction?"
          }
          item={dataItem.transaction_name}
          queryKey={"transaction"}
          transaction={true}
        />
      )}
    </>
  );
};

export default TransactionTable;

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FiArchive, FiEdit3 } from "react-icons/fi";
import { MdRestore } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
// import { StoreContext } from "../../../../../store/StoreContext";
// import {
//   setIsAdd,
//   setIsConfirm,
//   setIsRestore,
// } from "../../../../../store/StoreAction";
// import Searchbar from "../../../../partials/Searchbar";
// import Footer from "../../../../partials/Footer";
// import Loadmore from "../../../../partials/Loadmore";
// import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
// import Nodata from "../../../../partials/Nodata";
// import TableLoading from "../../../../partials/TableLoading";
// import ServerError from "../../../../partials/ServerError";
// import ModalConfirm from "../../../../partials/modals/ModalConfirm";
// import ModalDeleteAndRestore from "../../../../partials/modals/ModalDeleteAndRestore";
// import Pills from "../../../../partials/Pills";
// import TableSpinner from "../../../../partials/spinners/TableSpinner";
// import useQueryData from "../../../../custom-hooks/useQueryData";
import { getEntitiesCountRecord } from "./functions-entities";
// import RecordCount from "../../../../partials/RecordCount";

const EntitiesTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  const { ref, inView } = useInView();

  let counter = 1;
  let active = 0;
  let inactive = 0;

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
    queryKey: ["settings-entities", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/controllers/developer/settings/entities/search.php`, // search endpoint
        `/v2/controllers/developer/settings/entities/page.php?start=${pageParam}`, // list endpoint // list endpoint
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

  const { data: entities } = useQueryData(
    `/v2/controllers/developer/settings/entities/entities.php`,
    "get",
    "settings-entities"
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
    setId(item.entities_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.entities_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.entities_aid);
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
        status={getEntitiesCountRecord(
          store.isSearch ? result?.pages[0] : entities
        )}
      />
      <div className="table__wrapper relative rounded-md shadow-md overflow-auto mb-8">
        {isFetching && status !== "loading" && <TableSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>ID</th>
              <th>Description</th>
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
                  active += item.entities_is_active === 1;
                  inactive += item.entities_is_active === 0;
                  return (
                    <tr key={key}>
                      <td>{counter++}.</td>
                      <td>
                        {item.entities_is_active === 1 ? (
                          <Pills label="Active" tc="text-success" />
                        ) : (
                          <Pills label="Inactive" tc="text-archive" />
                        )}
                      </td>
                      <td>{item.entities_id}</td>
                      <td>{item.entities_description}</td>

                      <td
                        className="table__action top-0 right-5 "
                        data-ellipsis=". . ."
                      >
                        {item.entities_is_active === 1 ? (
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
      <div className="loadmore flex justify-center flex-col items-center my-5">
        <Loadmore
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          result={result?.pages[0]}
          setPage={setPage}
          page={page}
          refView={ref}
        />
      </div>

      {store.isConfirm && (
        <ModalConfirm
          mysqlApiArchive={`/v2/controllers/developer/settings/entities/active.php?entitiesId=${id}`}
          msg={"Are you sure you want to archive this client entities?"}
          item={dataItem.entities_id}
          queryKey={"settings-entities"}
        />
      )}

      {store.isRestore && (
        <ModalDeleteAndRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v2/controllers/developer/settings/entities/entities.php?entitiesId=${id}`}
          mysqlApiRestore={`/v2/controllers/developer/settings/entities/active.php?entitiesId=${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this client entities?"
              : "Are you sure you want to restore this client entities?"
          }
          item={dataItem.entities_id}
          queryKey={"settings-entities"}
        />
      )}
    </>
  );
};

export default EntitiesTable;

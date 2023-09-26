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

const ProductTable = () => {
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
    queryKey: ["product", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/controllers/developer/product/search.php`, // search endpoint
        `/v2/controllers/developer/product/page.php?start=${pageParam}`, // list endpoint // list endpoint
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

  React.useEffect(() => {
    dispatch(setIsSearch(false));
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
    setId(item.client_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.client_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.client_aid);
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
      <div className="table__wrapper relative rounded-md shadow-md overflow-auto mb-8">
        {isFetching && status !== "loading" && <TableSpinner />}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th width={`100px`}>Status</th>
              <th width={`170px`}>Name</th>
              <th width={`170px`}>Quantity</th>

              <th className="action lg:hidden"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                <TableLoading cols={3} count={20} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Loadmore />
    </>
  );
};

export default ProductTable;

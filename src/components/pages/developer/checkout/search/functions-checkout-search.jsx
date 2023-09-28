import { queryData } from "../../../../helpers/queryData";

export const handleSearch = async (
  e,
  setSearch,
  setIsSearch,
  setLoading,
  endpoint,
  setData
) => {
  if (e.target.value.trim() === "") {
    setSearch("");
    setIsSearch(false);
    return;
  }
  setLoading(true);
  setIsSearch(true);
  setSearch(e.target.value);

  const data = await queryData(endpoint, "post", { search: e.target.value });

  if (typeof data === "undefined") {
    setLoading(true);
    console.log("undefined");
    return;
  }

  if (!data.success) {
    setLoading(true);
    setData([]);
    setIsSearch(false);
    return;
  }

  if (data.success) {
    setData(data.data);
    setLoading(false);
  }
};

export const handleClick = (name, id, setSearch, setIsSearch, setId) => {
  setSearch(name);
  setIsSearch(false);
  setId(id);
};

export const getRemaningQty = (transactionGroupByProdctId, item) => {
  let qty = 0;

  const result = transactionGroupByProdctId?.data.filter(
    (tItem) => Number(tItem.transaction_product_id) === item.product_aid
  );

  let transactionQty = result?.length > 0 ? result[0].qty : 0;
  let productQty = item.qty;

  qty = Number(productQty) - Number(transactionQty);

  return qty;
};

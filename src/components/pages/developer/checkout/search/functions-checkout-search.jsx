import { queryData } from "../../../../helpers/queryData";

export const handleSearch = async (
  e,
  setSearch,
  setIsSearch,
  setLoading,
  endpoint,
  setData,
  value
) => {
  if (e.target.value.trim() === "") {
    setSearch("");
    setIsSearch(false);
    return;
  }
  setLoading(true);
  setIsSearch(true);
  setSearch(e.target.value);

  const data = await queryData(endpoint, "post", { search: value });

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

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { setIsSearch, setStartIndex } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";

const BreadCrumbs = ({ param = "" }) => {
  const { dispatch } = React.useContext(StoreContext);
  const location = useLocation();

  let currentLink = "";
  const handleClick = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };

  const crumbs = location.pathname
    .replace("-", " ")
    .split("/")
    .filter((crumb) => crumb !== "");

  return (
    <>
      <div className="breadcrumbs">
        <ul className="flex items-center gap-6">
          {crumbs.map((link, key) => {
            currentLink += `/${link.replace(" ", "-")}`;
            return (
              <li
                className={`text-[12px] opacity-70 hover:underline relative after:content-['/'] after:absolute after:top-0 after:-right-[15px] last:after:hidden last:opacity-100  last:pointer-events-none ${
                  (link === "settings" || link === "tools") &&
                  "pointer-events-none"
                }`}
                key={key}
              >
                <Link
                  to={`${currentLink}${param}`}
                  className="capitalize"
                  onClick={handleClick}
                >
                  {link.replace("-", " ").replace("_", "/")}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default BreadCrumbs;

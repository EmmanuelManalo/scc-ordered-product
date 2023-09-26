import React from "react";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import { StoreContext } from "../../../../store/StoreContext";
import ProductTable from "./ProductTable";

const Product = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <Header />
      <section className={`main__grid ${store.isMenuOpen ? "open" : ""}`}>
        <aside
          className={`${store.isMenuOpen ? "open " : ""} overflow-y-auto `}
        >
          <Navigation />
        </aside>
        <main className="p-3 !pb-6 lg:p-0 lg:pr-10 custom__scroll">
          <div className="flex items-center justify-between py-3 pt-6">
            <h1 className="mb-0">Product</h1>
            <button className="btn btn-primary btn--sm">Add</button>
          </div>
          <div>
            <ProductTable />
          </div>
        </main>
      </section>
    </>
  );
};

export default Product;

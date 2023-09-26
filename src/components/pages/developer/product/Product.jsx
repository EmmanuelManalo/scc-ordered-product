import React from "react";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import { StoreContext } from "../../../../store/StoreContext";

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
          <h1 className="mb-0">Product</h1>
          <button className="btn btn-primary btn--sm">Add</button>
        </main>
      </section>
    </>
  );
};

export default Product;

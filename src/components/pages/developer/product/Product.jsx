import React from "react";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import { StoreContext } from "../../../../store/StoreContext";
import ProductTable from "./ProductTable";
import ModalAddProduct from "./ModalAddProduct";
import { setIsAdd, setIsMenuOpen } from "../../../../store/StoreAction";
import ModalValidate from "../../../partials/modals/ModalValidate";
import Toast from "../../../partials/Toast";

const Product = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    setItemEdit(null);
    dispatch(setIsAdd(true));
  };
  React.useEffect(() => {
    dispatch(setIsMenuOpen(false));
  }, []);
  return (
    <>
      <Header />
      <section className={`main__grid ${store.isMenuOpen ? "open" : ""}`}>
        <aside
          className={`${store.isMenuOpen ? "open " : ""} overflow-y-auto `}
        >
          <Navigation menu={`product`} />
        </aside>
        <main className="px-2 lg:pr-10 custom__scroll">
          <div className="flex items-center justify-between my-5">
            <h1 className="mb-0">Product</h1>
            <button className="btn btn-primary btn--sm" onClick={handleAdd}>
              Add
            </button>
          </div>
          <div>
            <ProductTable setItemEdit={setItemEdit} />
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddProduct itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}
      {store.success && <Toast />}
    </>
  );
};

export default Product;

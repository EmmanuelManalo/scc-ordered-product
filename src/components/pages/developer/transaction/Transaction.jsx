import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import TransactionTable from "./TransactionTable";
import ModalAddTransaction from "./ModalAddTransaction";
import ModalValidate from "../../../partials/modals/ModalValidate";
import Toast from "../../../partials/Toast";

const Transaction = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    setItemEdit(null);
    dispatch(setIsAdd(true));
  };
  return (
    <>
      <Header />
      <section className={`main__grid ${store.isMenuOpen ? "open" : ""}`}>
        <aside
          className={`${store.isMenuOpen ? "open " : ""} overflow-y-auto `}
        >
          <Navigation menu={`transaction`} />
        </aside>
        <main className="px-2 lg:pr-10 custom__scroll">
          <div className="flex items-center justify-between my-5">
            <h1 className="mb-0">Transaction</h1>
            <button className="btn btn-primary btn--sm" onClick={handleAdd}>
              Add
            </button>
          </div>
          <div>
            <TransactionTable setItemEdit={setItemEdit} />
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddTransaction itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}
      {store.success && <Toast />}
    </>
  );
};

export default Transaction;

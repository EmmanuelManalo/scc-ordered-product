import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import Toast from "../../../partials/Toast";
import ModalValidate from "../../../partials/modals/ModalValidate";
import ModalAddTransaction from "./ModalAddTransaction";
import TransactionTable from "./TransactionTable";
import { setIsMenuOpen } from "../../../../store/StoreAction";

const Transaction = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

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
          <Navigation menu={`transaction`} />
        </aside>
        <main className="px-2 lg:pr-10 custom__scroll">
          <div className="flex items-center justify-between my-5">
            <h1 className="mb-0">Transaction</h1>
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

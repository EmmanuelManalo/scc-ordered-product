import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
// import { StoreContext } from "../../../../../store/StoreContext";
// import { setIsAdd } from "../../../../../store/StoreAction";
// import Header from "../../../../partials/Header";
// import Navigation from "../../../../partials/Navigation";
// import BreadCrumbs from "../../../../partials/Breadcrumbs";
// import EntitiesTable from "./EntitiesTable";
// import ModalAddEntities from "./ModalAddEntities";
// import ModalValidate from "../../../../partials/modals/ModalValidate";
// import Toast from "../../../../partials/Toast";

const Individual = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <section className={`main__grid ${store.isShow ? "open" : ""}`}>
        <aside
          className={`${store.isMenuOpen ? "open " : ""} overflow-y-auto `}
        >
          <Navigation menu="settings" submenu="settingsEntities" />
        </aside>
        <main className="px-2 lg:pr-10 custom-scroll">
          <BreadCrumbs />
          <div className="flex justify-between items-center my-5">
            <h1 className="mb-0">Client Entities</h1>
            <button className="btn btn--accent btn--sm" onClick={handleAdd}>
              Add
            </button>
          </div>

          <EntitiesTable setItemEdit={setItemEdit} />
        </main>
      </section>

      {store.isAdd && <ModalAddEntities itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}
      {store.success && <Toast />}
    </>
  );
};

export default Entities;

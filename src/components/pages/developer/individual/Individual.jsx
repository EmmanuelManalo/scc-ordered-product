import React from "react";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import BreadCrumbs from "../../../partials/Breadcrumbs";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import IndividualTable from "./IndividualTable";

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
          <Navigation menu="individual" />
        </aside>
        <main className="px-2 lg:pr-10 custom-scroll">
          <BreadCrumbs />
          <div className="flex justify-between items-center my-5">
            <h1 className="mb-0">Individuals</h1>
            <button className="btn btn--accent btn--sm" onClick={handleAdd}>
              Add
            </button>
          </div>

          <IndividualTable setItemEdit={setItemEdit} />
        </main>
      </section>

      {/* {store.isAdd && <ModalAddIndividual itemEdit={itemEdit} />}
      {store.validate && <ModalValidate />}
      {store.success && <Toast />} */}
    </>
  );
};

export default Individual;

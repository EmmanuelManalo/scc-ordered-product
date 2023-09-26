import React from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { setError } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { handleEscape } from "../../helpers/functions-general";

const ModalError = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setError(false));
  };

  handleEscape(() => handleClose());

  return (
    <>
      <div className="bg-dark/50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
        <div
          className={`modal__main absolute mx-1 bg-white border border-gray-200 rounded-md py-8 px-5 max-w-[420px] w-full shadow-xl`}
        >
          <div className="modal__header flex flex-col items-center">
            <BsFillExclamationCircleFill className="text-5xl fill-alert mb-5" />
            <h3 className="text-lg">Something went wrong! </h3>
          </div>

          <p className="text-center">{store.message}</p>

          <div className="modal__action flex justify-center mt-6 gap-2">
            <button className="btn btn--primary" onClick={handleClose}>
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalError;

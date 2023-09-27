import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import {
  setIsAdd,
  setMessage,
  setSuccess,
  setValidate,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import { handleEscape } from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import useQueryData from "../../../custom-hooks/useQueryData";

const ModalAddTransaction = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v1/controllers/developer/transaction/transaction.php?transactionId=${itemEdit.transaction_aid}` //update
          : "/v1/controllers/developer/transaction/transaction.php", //add
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? `updated` : `added`}.`));
      }
      // show error box
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const {
    loadingProduct,
    isFetchingProduct,
    errorProduct,
    data: product,
  } = useQueryData(
    `/v1/controllers/developer/product/product.php`,
    "get",
    "product"
  );
  const {
    loadingIndividual,
    isFetchingIndividual,
    errorIndividual,
    data: individual,
  } = useQueryData(
    `/v1/controllers/developer/individual/individual.php`,
    "get",
    "individual"
  );

  const initVal = {
    transaction_product_id: itemEdit ? itemEdit.transaction_product_id : "",
    transaction_individual_id: itemEdit
      ? itemEdit.transaction_individual_id
      : "",
    transaction_quantity: itemEdit ? itemEdit.transaction_quantity : "",

  };

  const yupSchema = Yup.object({
    transaction_product_id: Yup.string().required("Required"),
    transaction_individual_id: Yup.string().required("Required"),
    transaction_quantity: Yup.string().required("Required"),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  handleEscape(() => handleClose());
  return (
    <>
      <div className="bg-dark/50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
        <div
          className={`modal__main absolute mx-1 bg-white border border-gray-200 rounded-md py-8 px-5 max-w-[420px] w-full shadow-xl`}
        >
          <div className="modal__header relative">
            <h3> {itemEdit ? "Update" : "Add"} Transaction </h3>
            <button className="absolute -top-4 right-0 " onClick={handleClose}>
              <FaTimes className="text-gray-700 text-base" />
            </button>
          </div>
          <div className="modal__body overflow-auto max-h-[50vh]">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="modal__body ">
                      <div className="form__wrap">
                        <InputSelect
                          label="Product"
                          type="text"
                          name="transaction_product_id"
                          disabled={mutation.isLoading}
                          onChange={(e) => e}
                        >
                          {loadingProduct ? (
                            <option value="" hidden>
                              Loading..
                            </option>
                          ) : errorProduct ? (
                            <option value="" disabled>
                              Error
                            </option>
                          ) : (
                            <optgroup label="Select Product">
                              <option value="" hidden></option>
                              {product?.data.length > 0 ? (
                                product?.data.map((item, key) => {
                                  return (
                                    <option value={item.product_aid} key={key}>
                                      {item.product_name}
                                    </option>
                                  );
                                })
                              ) : (
                                <option value="" disabled>
                                  No data
                                </option>
                              )}
                            </optgroup>
                          )}
                        </InputSelect>
                      </div>
                      <div className="form__wrap">
                        <InputSelect
                          label="Individual"
                          type="text"
                          name="transaction_individual_id"
                          disabled={mutation.isLoading}
                          onChange={(e) => e}
                        >
                          {loadingIndividual ? (
                            <option value="" hidden>
                              Loading..
                            </option>
                          ) : errorIndividual ? (
                            <option value="" disabled>
                              Error
                            </option>
                          ) : (
                            <optgroup label="Select Individual">
                              <option value="" hidden></option>
                              {individual?.data.length > 0 ? (
                                individual?.data.map((item, key) => {
                                  return (
                                    <option
                                      value={item.individual_aid}
                                      key={key}
                                    >
                                      {item.individual_fname}{" "}
                                      {item.individual_lname}
                                    </option>
                                  );
                                })
                              ) : (
                                <option value="" disabled>
                                  No data
                                </option>
                              )}
                            </optgroup>
                          )}
                        </InputSelect>
                      </div>
                      <div className="form__wrap">
                        <InputText
                          label="Quantity"
                          type="text"
                          number="number"
                          name="transaction_quantity"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="modal__action flex justify-end mt-6 gap-2">
                        <button
                          className="btn btn--primary"
                          type="submit"
                          disabled={mutation.isLoading || !props.dirty}
                        >
                          {mutation.isLoading ? (
                            <ButtonSpinner />
                          ) : itemEdit ? (
                            "Save"
                          ) : (
                            "Add"
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn--cancel"
                          disabled={mutation.isLoading}
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddTransaction;

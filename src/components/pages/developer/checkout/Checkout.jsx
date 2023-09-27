import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  setMessage,
  setSuccess,
  setValidate,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import { queryData } from "../../../helpers/queryData";
import Toast from "../../../partials/Toast";
import ModalValidate from "../../../partials/modals/ModalValidate";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import CheckoutHeader from "./CheckoutHeader";
import Search from "./search/Search";
import { devApiUrl, pesoSign } from "../../../helpers/functions-general";
// import * as Yup from "yup";

const Checkout = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // search individual
  const [loadingIndividual, setLoadingIndividual] = React.useState(false);
  const [isSearchIndividual, setIsSearchIndividual] = React.useState(false);
  const [searchIndividual, setSearchIndividual] = React.useState("");
  const [dataIndividual, setDataIndividual] = React.useState([]);
  const [individualId, setIndividualId] = React.useState("");

  // search product
  const [loadingProduct, setLoadingProduct] = React.useState(false);
  const [isSearchProduct, setIsSearchProduct] = React.useState(false);
  const [searchProduct, setSearchProduct] = React.useState("");
  const [dataProduct, setDataProduct] = React.useState([]);
  const [productId, setProductId] = React.useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        "/v1/controllers/developer/checkout/create.php",
        "post",
        values
      ),

    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["checkout-list"],
      });
      // show error box
      setSearchIndividual("");
      setSearchProduct("");
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully added.`));
      }
      if (!data.success) {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleSearchModal = () => {
    setIsSearchIndividual(false);
    setIsSearchProduct(false);
  };

  const initVal = {
    searchIndividual: "",
    searchProduct: "",
    transaction_quantity: "",
  };

  const yupSchema = Yup.object({
    searchIndividual: Yup.string().required("Required"),
    searchProduct: Yup.string().required("Required"),
    transaction_quantity: Yup.string().required("Required"),
  });
  return (
    <>
      <CheckoutHeader />
      <section className="flex justify-center">
        <main className="px-2 custom-scroll  lg:w-[30rem] md:w-[30rem]">
          <div className="flex justify-between items-center my-5"></div>
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              if (dataProduct?.length === 0) {
                dispatch(setValidate(true));
                dispatch(setMessage("please select product first"));
                return;
              }

              const totalAmount =
                Number(dataProduct[0]?.price) *
                Number(values.transaction_quantity);

              // mutate data
              mutation.mutate({
                ...values,
                transaction_product_id: productId,
                transaction_individual_id: individualId,
                transaction_total: totalAmount,
                product: dataProduct[0],
              });
              resetForm();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal__body">
                    <div className="form__wrap">
                      <Search
                        label="Individual"
                        name="searchIndividual"
                        disabled={mutation.isLoading}
                        endpoint={`/v1/controllers/developer/checkout/search-individual.php`}
                        setSearch={setSearchIndividual}
                        setIsSearch={setIsSearchIndividual}
                        handleSearchModal={handleSearchModal}
                        setLoading={setLoadingIndividual}
                        setData={setDataIndividual}
                        search={searchIndividual}
                        isSearch={isSearchIndividual}
                        loading={loadingIndividual}
                        data={dataIndividual}
                        setId={setIndividualId}
                      />
                    </div>
                    <div className="form__wrap">
                      <Search
                        label="Product"
                        name="searchProduct"
                        disabled={mutation.isLoading}
                        endpoint={`/v1/controllers/developer/checkout/search-products.php`}
                        setSearch={setSearchProduct}
                        setIsSearch={setIsSearchProduct}
                        handleSearchModal={handleSearchModal}
                        setLoading={setLoadingProduct}
                        setData={setDataProduct}
                        search={searchProduct}
                        isSearch={isSearchProduct}
                        loading={loadingProduct}
                        data={dataProduct}
                        setId={setProductId}
                      />
                    </div>
                    <div className="form__wrap">
                      <InputText
                        label="Quantity"
                        type="text"
                        number="number"
                        name="transaction_quantity"
                        onClick={() => handleSearchModal()}
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="text-2xl">
                      Total: {pesoSign}{" "}
                      {dataProduct?.length > 0
                        ? (
                            Number(dataProduct[0]?.price) *
                            Number(props.values.transaction_quantity)
                          ).toFixed(2)
                        : "0.00"}
                    </div>
                    <div className="flex justify-center mt-10 gap-2">
                      <button
                        className="btn btn--primary px-6 py-4"
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                      >
                        {mutation.isLoading ? <ButtonSpinner /> : "Checkout"}
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </main>
      </section>
      {store.validate && <ModalValidate />}
      {store.success && <Toast />}
    </>
  );
};

export default Checkout;

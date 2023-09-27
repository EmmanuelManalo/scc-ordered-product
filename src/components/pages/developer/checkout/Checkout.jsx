import { Form, Formik } from "formik";
import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import CheckoutHeader from "./CheckoutHeader";
// import * as Yup from "yup";

const Checkout = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  // const initVal = {
  //   product_name: itemEdit ? itemEdit.product_name : "",
  //   product_quantity: itemEdit ? itemEdit.product_quantity : "",

  //   product_name_old: itemEdit ? itemEdit.product_name : "",
  // };

  // const yupSchema = Yup.object({
  //   product_name: Yup.string().required("Required"),
  //   product_quantity: Yup.string().required("Required"),
  // });

  return (
    <>
      <CheckoutHeader />
      <section className="flex justify-center">
        <main className="px-2 custom-scroll  lg:w-[30rem] md:w-[30rem]">
          <div className="flex justify-between items-center my-5"></div>
          <Formik
            // initialValues={initVal}
            // validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // mutate data
              // mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal__body">
                    <div className="form__wrap">
                      <InputText
                        label="Product"
                        type="text"
                        name="product_name"
                        // disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="form__wrap">
                      <InputText
                        label="Quantity"
                        type="text"
                        number="number"
                        name="product_quantity"
                        // disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="form__wrap">
                      <InputText
                        label="Individual"
                        type="text"
                        number="number"
                        name="product_quantity"
                        // disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="text-2xl">Total:</div>
                    <div className="flex justify-center mt-10 gap-2">
                      <button
                        className="btn btn--primary px-6 py-4"
                        type="submit"
                        // disabled={mutation.isLoading || !props.dirty}
                      >
                        <ButtonSpinner />
                        Checkout
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </main>
      </section>
    </>
  );
};

export default Checkout;

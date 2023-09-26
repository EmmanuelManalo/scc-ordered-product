import { useField } from "formik";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { NumericFormat, PatternFormat } from "react-number-format";

export const InputTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <textarea
        className={meta.touched && meta.error ? "error-show" : null}
        {...field}
        {...props}
        autoComplete="off"
      ></textarea>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputSearch = ({ label, onChange, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        autoComplete="off"
        onChange={(e) => {
          onChange(e);
          field.onChange(e);
        }}
      />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputText = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  if (props.number === "number") {
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <NumericFormat
          {...field}
          {...props}
          allowLeadingZeros
          autoComplete="off"
          className={meta.touched && meta.error ? "error-show" : null}
        />

        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }

  if (props.ein_ssn === "ein_ssn") {
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <PatternFormat
          {...field}
          {...props}
          format="##-###-###"
          allowEmptyFormatting
          mask="_"
          className={meta.touched && meta.error ? "error-show" : null}
          autoComplete="off"
        />

        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }
  if (props.landline === "landline") {
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <PatternFormat
          {...field}
          {...props}
          format="(###) ####"
          allowEmptyFormatting
          mask="_"
          className={meta.touched && meta.error ? "error-show" : null}
          autoComplete="off"
        />

        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }

  if (props.mobile === "mobile") {
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <PatternFormat
          {...field}
          {...props}
          format="+## (###) #### ###"
          allowEmptyFormatting
          mask="_"
          className={meta.touched && meta.error ? "error-show" : null}
          autoComplete="off"
        />

        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }

  if (props.id === "id") {
    return (
      <>
        <label
          htmlFor={props.id || props.name}
          className={
            meta.touched && meta.error ? "custom error-show" : "custom"
          }
        >
          {label}
        </label>
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "error-show" : "uppercase"}
          autoComplete="off"
        />
        {meta.touched && meta.error ? (
          <span className="error-show ">{meta.error}</span>
        ) : null}
      </>
    );
  }

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        autoComplete="off"
      />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputSelect = ({ label, onChange, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "custom error-show" : "custom"}
      >
        {label}
      </label>

      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        onChange={(e) => {
          onChange(e);
          field.onChange(e);
        }}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputFileUpload = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="error--msg">{meta.error}</span>
      ) : null}
    </>
  );
};

export const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input {...field} {...props} />
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "error-show" : ""}
      >
        {label}
      </label>

      {/* {meta.touched && meta.error ? (
        <p className="error-msg">{meta.error}</p>
      ) : null} */}
    </>
  );
};

export const MyCheckbox = ({ label, open, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className="relative flex cursor-pointer items-center justify-center rounded-full"
        htmlFor="select_all"
      >
        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "w-auto h-auto error-show"
              : "p-1.5 before:content-[''] peer relative h-auto w-auto cursor-pointer border-primary appearance-none rounded-sm transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity checked:bg-primary"
          }
        />
        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <FaCheck className="h-3 w-3" />
        </span>
      </label>
    </>
  );
};

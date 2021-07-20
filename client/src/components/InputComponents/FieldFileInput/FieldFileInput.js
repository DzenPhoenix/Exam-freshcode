import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const {
    fileUploadContainer, labelClass, fileNameClass, fileInput,
  } = classes;

  return (
    <Field name={rest.name}>
      {
        (formik) => {
          const field = formik.field;
          const form = formik.form;
          const setFieldValue = form.setFieldValue;

          const getFileName = () => {
            if (field.value) {
              return field.value.name;
            }
            return '';
          };

          const onChange = (e) => {
            const file = e.target.files[0];
            setFieldValue("file", file);
          }

          return (
            <div className={fileUploadContainer}>
              <label htmlFor="fileInput" className={labelClass}>
                Choose file
              </label>
              <span id="fileNameContainer" className={fileNameClass}>
                {getFileName()}
              </span>
              <input
                name="file"
                onChange={(e) => onChange(e)}
                className={fileInput}
                id="fileInput"
                type="file"
              />
            </div>
          );
        }
      }
    </Field>
  );
};

export default FieldFileInput;

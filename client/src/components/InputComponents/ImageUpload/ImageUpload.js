import React from 'react';
import classNames from 'classnames';
import { Field, } from 'formik';

//Formik does not work with files by default
//thats why i use custom onChange whith setFieldValue instead of handleChange (on default case)

const onChange = (e, setFieldValue) => {
  const node = window.document.getElementById('imagePreview');
  const file = e.target.files[0];
  setFieldValue("file", file);
  const imageType = /image.*/;
  if (!file.type.match(imageType)) {
    e.target.value = '';
  }
  else {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      node.src = result;
    };
    reader.readAsDataURL(file);
  }
}

const ImageUpload = (props) => {
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  return (
    <Field name={props.name} type={props.type}>
      {
        (formik) => {
          const form = formik.form;
          const setFieldValue = form.setFieldValue;

          return (
            <div className={uploadContainer}>
              <div className={inputContainer}>
                <span>Support only images (*.png, *.gif, *.jpeg)</span>
                <input
                  id="fileInput"
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  name="file"
                  onChange={(e) => onChange(e, setFieldValue)}
                />
                < label htmlFor="fileInput" > Chose file</label>
              </div>
              <img id="imagePreview" src='staticImages/anonym.png' className={classNames(imgStyle)} alt="user" />
            </div>
          )
        }
      }
    </Field>
  )
}
export default ImageUpload;

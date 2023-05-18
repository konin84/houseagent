import React from 'react'
import { Form, useForm } from '../../components/useForm';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';

export default function ImageForm(props) {

  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("title" in fieldValues)
      temp.title = fieldValues.first_name ? "" : "This field is required.";

    if ("avatar" in fieldValues)
      temp.avatar =
        fieldValues.avatar.length > 0 ? "" : "Select avatar.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const initialFValues = {
    title: "",
    photo: "",
   
  };
  //

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      addOrEdit(values, resetForm);
    }
    console.log("Values to be UPDATED", values);
  };

  return (
    <div>
      <h1>Testing File upload</h1>
      <Form  onSubmit={handleSubmit}>
        <Grid container>
        <Grid item xs={8}>

        <Controls.Input
              name="title"
              onChange={handleInputChange}
              value={values.title}
              label="Image Title"
              error={errors.title}
            />


        <Controls.Input
              name="photo"
              onChange={handleInputChange}
              value={values.photo}
              label="Photo"
              type='file'
              accept='image/*'
              error={errors.photo}
            />
          </Grid>

         
          <div className="mx-3 md:flex mt-2">
            <div className="md:w-full px-3">
              <button
                className="md:w-md float-right  bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-md mr-14"
                type="submit"
              >
                Save data
              </button>
            </div>
          </div>
        </Grid>

      </Form>
    </div>
  )
}

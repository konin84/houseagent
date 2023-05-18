import React, { useState, useEffect } from "react";
import Controls from "../../components/controls/Controls";
import { Grid } from "@material-ui/core";

import { useForm, Form } from "../../components/useForm";

import * as houseService from "../../services/houseService";
import * as authService from "../../services/authServices";
import jwt_decode from "jwt-decode";

export default function TenantForm(props) {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));
  const [data, setData] = useState([]);
  const [avatar, setAvatar] = useState("");

  //
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("first_name" in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "This field is required.";
    if ("last_name" in fieldValues)
      temp.last_name = fieldValues.last_name ? "" : "This field is required.";

    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("phone_number" in fieldValues)
      temp.phone_number =
        fieldValues.phone_number.length > 8
          ? ""
          : "Minimum 10 numbers required.";

    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 8 ? "" : "Minimum 10 numbers required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const myHouses = () => {
    houseService.realtorHouses().then((res) => {
      const newData = res.data.filter((r) => r.tenant === null);
      console.log("New House Data", newData);
      setData(newData);
    });
  };

  const houses = [
    data.map((h) => {
      return { id: h.id, title: h.reference };
    }),
  ];

  const genderItems = [
    { id: "MALE", title: "Male" },
    { id: "FEMALE", title: "Female" },
    { id: "OTHER", title: "Other" },
  ];
  
  const gender = [
    genderItems.map((r) => {
      return { id: r.id, title: r.title };
    }),
  ];

  //
  const initialFValues = {
    first_name: "",
    last_name: "",
    gender: "MALE",
    email: "",
    // avatar: avatar,
    registered_by: user.email,
    phone_number: "",
    password: "",
    houserented: "",
    is_active: false,
  };
  //

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    // handleFileChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      addOrEdit(values, resetForm);
    }
    // console.log("Values to be UPDATED", values);
  };

  useEffect(() => {
    myHouses();
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit,setValues]);
  //

  //

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.RadioGroup
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInputChange}
              items={gender[0]}
              error={errors.gender}
            />

            <Controls.Input
              name="first_name"
              onChange={handleInputChange}
              value={values.first_name}
              label="First Name"
              error={errors.first_name}
            />

            <Controls.Input
              name="last_name"
              onChange={handleInputChange}
              value={values.last_name}
              label="Last Name"
              error={errors.last_name}
            />

            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />


            {/* <input
              name="avatar"
              type="file"
              onChange={handleFileChange}
              // value={values.avatar}
              // required
            /> */}
          </Grid>

          <Grid item xs={6}>
            <Controls.Input
              label="Phone Number"
              name="phone_number"
              value={values.phone_number}
              onChange={handleInputChange}
              error={errors.phone_number}
            />
            <Controls.Select
              label="House to rent"
              name="houserented"
              value={values.houserented}
              onChange={handleInputChange}
              options={houses[0]}
              error={errors.houserented}
            />
            <Controls.Input
              label="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              type="password"
            />
            <Controls.Checkbox
              onChange={handleInputChange}
              name="is_active"
              label="Is Active User?"
              value={Boolean(values.is_active)}
            />

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

          {/* <Controls.Input
                  label='realtor'
                  name="realtor"
                  value={values.registered_by}
                  onChange={handleInputChange}
                  type='text'
                  disabled
                /> */}
        </Grid>
      </Form>
    </div>
  );
}

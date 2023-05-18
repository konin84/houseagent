import React, { useState, useEffect } from "react";
import * as houseService from "../../services/houseService";
import * as authService from "../../services/authServices";

import jwt_decode from "jwt-decode";
import Controls from "../../components/controls/Controls";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/useForm";

export default function HouseForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));

  const [data, setData] = useState([]);

  const houses = [
    { id: "Apartment", title: "Apartment" },
    { id: "Bungalow", title: "Bungalow" },
    { id: "Duplex", title: "Duplex" },
    { id: "Mansion", title: "Mansion" },
    { id: "Other", title: "Other" },
    { id: "Studio", title: "Studio" },
    { id: "Townhouse", title: "Townhouse" },
    { id: "Villa", title: "Villa" },
  ];

  const myLandLords = () => {
    houseService.realtorLandLords().then((res) => {
      console.log("LandLords", res.data);
      setData(res.data);
    });
  };

  useEffect(() => {
    myLandLords();
    if (recordForEdit !== null) {
      setValues({ ...recordForEdit });
    }
  }, [recordForEdit]);

  const landlors = [
    data.map((r) => {
      return { id: r.id, title: r.first_name + " " + r.last_name };
    }),
  ];

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("reference" in fieldValues)
      temp.reference = fieldValues.reference ? "" : "This field is required.";
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "This field is required.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const genderItems = [
    { id: 'MALE', title: 'Male' },
    { id: 'FEMALE', title: 'Female' },
    { id: 'OTHER', title: 'Other' },
]
//   const gender = [
//     genderItems.map((r) => {
//       return { id: r.id, title: r.title };
//     }),
//   ];


  const initialeValues = {
    houseOwner: "",
    realtor: user.email,
    tenant: null,
    reference: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    houseType: "",
    city: "",
    state: "",
    country: "",
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialeValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("House Data", values);
    addOrEdit(values);
  };

  return (
    <div>
  

      <Form onSubmit={handleSubmit}>
          <Grid container>

            <Grid item xs={6}>
            <Controls.Input
                label="Coutry"
                name="country"
                value={values.country}
                onChange={handleInputChange}
                error={errors.country}
            /> 
            <Controls.Input
                label="State"
                name="state"
                value={values.state}
                onChange={handleInputChange}
                error={errors.state}
            /> 
            <Controls.Input
                label="Bedrooms"
                name="bedrooms"
                value={values.bedrooms}
                onChange={handleInputChange}
                error={errors.bedrooms}
            /> 
            <Controls.Input
                label="Price"
                name="price"
                value={values.price}
                onChange={handleInputChange}
                error={errors.prince}
            /> 

              <Controls.Select
                  label ='Select the house type'
                  options={houses}
                  onChange={handleInputChange}
                  value={values.houseType}
                  name="houseType"
                />

            </Grid>

            <Grid item xs={6}>
            <Controls.Input
                label="Reference"
                name="reference"
                value={values.reference}
                onChange={handleInputChange}
                error={errors.reference}
            /> 
            <Controls.Input
                label="City"
                name="city"
                value={values.city}
                onChange={handleInputChange}
                error={errors.city}
            /> 
            <Controls.Input
                label="Bathrooms"
                name="bathrooms"
                value={values.bathrooms}
                onChange={handleInputChange}
                error={errors.bathrooms}
            /> 
            <Controls.Input
                label="Address"
                name="address"
                value={values.address}
                onChange={handleInputChange}
                error={errors.address}
            /> 

            <Controls.Select
                name="houseOwner"
                label="Select the land lord"
                options={landlors[0]}
                onChange={handleInputChange}
                value={values.houseOwner}
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

          </Grid>

      </Form>
    </div>
  );
}

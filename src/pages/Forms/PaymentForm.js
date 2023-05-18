import React, { useState, useEffect } from "react";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as authService from "../../services/authServices";
import * as userService from "../../services/userService";
import * as houseService from "../../services/houseService";

import jwt_decode from "jwt-decode";
import { Grid } from "@material-ui/core";

export default function PaymentForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [houseData, setHouseData] = useState([]);
  const [data, setData] = useState([]);
  const [realtor, setRealtor] = useState('');
  const [realtorId, setRealtorId] = useState(null);


  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));

  //

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("paymentMethod" in fieldValues)
      temp.paymentMethod =
        fieldValues.length !== 0 ? "" : "This field is required.";
    if ("realtor" in fieldValues)
      temp.realtor =
        fieldValues.length !== 0 ? "" : "This field is required.";
    if ("amount" in fieldValues)
      temp.amount = fieldValues.amount ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const paymentType = [
    { id: "Other", title: "Bank Transfer" },
    { id: "Cash", title: "Cash" },
    { id: "Cheque", title: "Cheque" },
    { id: "Momo", title: "Momo" },
  ];

  // console.log("PAYMENT TYPE", paymentType);
 

  const myHouse = () => {
    houseService.tenantHouse().then((res) => {
      console.log("HOUSE DETAILS ", res.data);
      console.log('MY REALTOR', res.data[0].realtor)
      setHouseData(res.data);
      setRealtor(res.data[0].realtor)
      setRealtorId(res.data[0].id)
    });
  };
  // const newRealtor =realtor

  // console.log('NEW REALTOR ', newRealtor)
  
  const myAgent = () => {
    userService.tenantRealtor().then((res) => {
      setData(res.data);
      
    });
};
//   const myRealtor = () => {
//     userService.tenantRealtor().then((res) => {
//       // console.log('USER', res[0].realtor)
//       setRealtor(res[0].realtor);
//     });
// };

const agent = [
  data.map((r) => {
    return { id: r.email, title: r.first_name + " " + r.last_name };
  }),
];

console.log('REALTOR: ', houseData)
console.log('LOGIN USER DATA: ', user)


  const initialeValues = {
    tenant: user.email,
    realtor: realtor,
    paymentMethod: "",
    amount: "",
  };

  console.log('INITIAL VALUES', initialeValues)

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialeValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Data", values);
    if (validate()) {
      addOrEdit(values);
    }
  };

  useEffect(() => {
    // myRealtor();
    myHouse();
    myAgent();
    if (recordForEdit !== null) {
      setValues({ ...recordForEdit });
    }
  }, []);

  return (
    <div>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
             
              {houseData.map((p) => {
                return (
                  <div key={p.id}>
                    <p  className="mr-2 p-2">Amount to be paid: <span className="mr-2 font-bold text-md">{p.price} </span> </p>
                    
                    <p  className="mr-2 p-2"> {p.reference}</p>                
                    {/* <p  className="mr-2 p-2">Realtor: {p.realtor}</p>  */}
                                  
                  </div>
                );
                
              })}

              {/* <table>
                <tbody>
                  <tr>
                    <td>Realtor</td>
                  </tr>
                  {houseData.map((p) => 
                  <tr>
                    <td>{p.realtor}</td>
                  </tr>
                  )}
                </tbody>
              </table> */}

            </Grid>

            <Grid item xs={6}>
              
              <Controls.Select
                options={paymentType}
                onChange={handleInputChange}
                value={values.paymentMethod}
                name="paymentMethod"
                label="Payment Method"
                required
              />
              <Controls.Select
                name="realtor"
                label="Select Your agent"
                options={agent[0]}
                onChange={handleInputChange}
                value={values.realtor}
                />  
{/* 
              <Controls.Input
                hidden
                name="realtor"
                // onChange={handleInputChange}
                value={values.realtor}
                label="REALTOR"
                error={errors.realtor}
              /> */}

              <Controls.Input
                name="amount"
                onChange={handleInputChange}
                value={values.amount}
                label="Amount"
                error={errors.amount}
              />

              {/* <Controls.Input
                // disabled
                name="house"
                id=''
                onChange={handleInputChange}
                value={values.house}
                label="house reference"
                error={errors.house}
              /> */}
              {/* {
                  houseData.map((p) =>{
                    return (

                      <Controls.Input
                        type ='text'
                        name="price"
                        onChange={handleInputChange}
                        value={values.p.price}
                        label="Price"
                        error={errors.amount}
                      />
                    )
                  })

              } */}

              <div className="mx-3 md:flex mt-2">
                <div className="md:w-full">
                  <button
                    className="w-full bg-gray-900 text-white 
                    font-bold mr-8 py-2  border-b-4 hover:border-b-2 
                     border-gray-500 hover:border-gray-100 rounded-md"
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
    </div>
  );
}

import React from "react";

export default function About(props) {
  return (
    <div id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      

      <div className="about-imge mr-5 object-contain md:object-scale-down ">
        <img src={props.image} alt=""  height={200}/>
      </div>

      <div className=" text-center">
        <h2 className="text-4xl text-sky-400 ">{props.title}</h2>
        <div className="mt-8 text-justify text-2xl">
          <p>
            {" "}
            We work from 08:30 A.M. - 4:30 P.M. from Monday to Friday, except
            public holidays.
          </p>
          <br />
          <p>
            {" "}
            This Web App is mainly for Realtors or Agents who want to take their
            business to a higher level. It allows them to list the managed
            houses, their tenants and house owners. Trace all payments made by
            tenants at any time of the day.
          </p>
          <br />
          <p>
            Tired of carrying a receipt book that can easily be lost of distroy
            by water or fire? No more worry, with us all your transactions are
            stored in the cloud and accessible timelessly everywhere!
          </p>
        </div>
      </div>
      
      </div>

    </div>
  );
}

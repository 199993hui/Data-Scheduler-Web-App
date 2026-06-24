import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useState, useContext } from "react";
import * as Yup from "yup";

import "./LoginPage.css";
import { AlertContext } from "../../context/AlertContext";
const schema = Yup.object().shape({
  employeeID: Yup.string().required("Email is a required field"),
  password: Yup.string().required("Password is a required field"),
});

function LoginPage() {

  const navigate = useNavigate();

  const { setAlertVisibility, setAlertMessage, setType } =
    useContext(AlertContext);

  const getEmployee = async (emp) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emp),
      })
        .then((response) => response.json())
        .then((data) => {
          const [type, text] = Object.entries(data)[0];
          setAlertMessage(text);
          setAlertVisibility(true);
          setType(type);
           if (data["token"]) {
            localStorage.setItem("token", data["token"]);
             navigate("/main/dashboard");
           } else {
             navigate("/");
           }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  
 
  return (
    <div className="body">
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ employeeID: "", password: "" }}
        onSubmit={(values) => {
          const { employeeID, password } = values;
          getEmployee({ employeeID, password });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div className="login">
              <div className="form">
                <span>Login</span>
                <input
                  type="text"
                  name="employeeID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Employee ID"
                  className="form-control inp_text"
                  id="employeeID"
                />
                <p className="error">
                  {errors.employeeID && touched.employeeID && errors.employeeID}
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                  className="form-control"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button type="submit">Login</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;

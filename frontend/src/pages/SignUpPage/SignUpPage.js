import React from "react";
import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AlertContext } from "../../context/AlertContext";

const schema = Yup.object().shape({
  employeeID: Yup.number()
    .required("Employee ID is a required field")
    .integer("Employee ID must be a number"),
  name: Yup.string().required("Name is a required field"),
  password: Yup.string().required("Password is a required field"),
  repeat_password: Yup.string()
    .required("Repeat Password is a required field")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function SignUpPage() {
  const { setAlertVisibility, setAlertMessage, setType } = useContext(AlertContext);
  useEffect(() => {}, []);

  const navigate = useNavigate();

  const addEmployee = async (emp) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/emp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emp),
      });
      const message = await response.json();
      const [type, text]  = Object.entries(message)[0]
      setAlertMessage(text)
      setAlertVisibility(true)
      setType(type)
      
      if (response.status === 200) {
        navigate("/main/management");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{
          employeeID: "",
          name: "",
          password: "",
          repeat_password: "",
        }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          const { employeeID, name, password } = values;
          addEmployee({ employeeID, name, password });
          //alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form>
            <div class="row justify-content-md-center">
              <div class="col-md-5 col-sm-4 ">
                <div class="register-form">
                  <span>Add an Employee Now</span>
                  <div class="form-group mb-1">
                    <label>Employee ID</label>
                    <input
                      type="text"
                      name="employeeID"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.employeeID}
                      placeholder="Employee ID"
                      className="form-control"
                    />
                    <p className="error">
                      {errors.employeeID &&
                        touched.employeeID &&
                        errors.employeeID}
                    </p>
                  </div>
                  <div class="form-group mb-1">
                    <label>Name</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={values.name}
                    />
                    <p className="error">
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>
                  <div class="form-group mb-1">
                    <label>Password</label>
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
                  </div>
                  <div class="form-group mb-1">
                    <label>Repeat Password</label>
                    <input
                      type="password"
                      name="repeat_password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.repeat_password}
                      placeholder="Repeat Password"
                      className="form-control"
                    />
                    <p className="error">
                      {errors.repeat_password &&
                        touched.repeat_password &&
                        errors.repeat_password}
                    </p>
                  </div>
                  <button type="submit" class="btn btn-black  mr-3">
                    Add
                  </button>
                  <Link
                    to="/main/management"
                    type="submit"
                    class="btn btn-secondary ml-5"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignUpPage;

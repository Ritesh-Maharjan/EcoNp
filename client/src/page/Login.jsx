import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/slicer/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../utils/userApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  // validation for all input
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid Email")
      .required("Email is required field"),
    password: Yup.string()
      .min(7, "Must be greater than 7 characters")
      .required("Password is required field"),
  });

  const renderError = (message) => <p className="text-red-400">{message}</p>;

  const onSubmit = async (values, actions) => {
    const resData = await loginUser(values);

    if (resData?.data?.sucess) {
      dispatch(login([resData.data.token, resData.data.user]));
      navigate("/");
    } else {
      let errors = resData.response.data.message;
      actions.setFieldError("email", errors);
    }
  };
  return (
    <main className="w-[90vw] min-h-[90vh] m-auto flex items-center justify-center">
      <div className="w-full max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            await onSubmit(values, actions);
          }}
        >
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-black text-center font-bold text-lg mb-4">
              Login to your account
            </h1>

            <ErrorMessage name="email" render={renderError} />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
              />
            </div>

            <div className="mb-6">
              <ErrorMessage name="password" render={renderError} />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                name="password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                <Link to="../forgottenpassword">Forgot Password?</Link>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default Login;

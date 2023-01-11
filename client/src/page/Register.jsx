import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slicer/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "../utils/userApi";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  // validation for all input
  const validationSchema = Yup.object({
    name: Yup.string().min(3).required("Name is required field"),
    email: Yup.string().email().required("Email is required field"),
    password: Yup.string()
      .min(7, "Must be greater than 7 characters")
      .required("Password is required field"),
  });

  const renderError = (message) => <p className="text-red-400">{message}</p>;

  const onSubmit = async (values, actions) => {
    const resData = await createUser(values);

    if (resData?.data?.sucess) {
      dispatch(login(resData.data.token, resData.data.user));
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
              Sign up
            </h1>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder="Name"
              />
              <ErrorMessage name="name" render={renderError} />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                name="email"
              />
              <ErrorMessage name="email" render={renderError} />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                name="password"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default Register;

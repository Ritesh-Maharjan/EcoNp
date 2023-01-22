import React from "react";
import { useState } from "react";
import { forgotPassword } from "../utils/userApi";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [msg, setMsg] = useState("");

  const resetPassword = async () => {
    const validEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    console.log(validEmail.test(email));
    if (validEmail.test(email)) {
      const resData = await forgotPassword(email);
      if (resData.data?.success) {
        setMsg("Email has been sent.");
        setError("");
        setEmail("")
      } else {
        setError(resData.response.data.message);
      }
    } else {
      setError("Please provide valid email");
    }
  };
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center min-h-[90vh] gap-2">
        <div>
          {error && <p className="text-red-400 text-center my-2">{error}</p>}
          {msg && <p className="text-green-400 text-center my-2">{msg}</p>}
          <label htmlFor="email" className="mr-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Please enter email:"
            className="px-2 text-black"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setMsg("");
            }}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={resetPassword}
        >
          Reset password
        </button>
      </div>
    </main>
  );
};

export default ForgottenPassword;

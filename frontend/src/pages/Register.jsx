import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(GlobalContext);
  return (
    <div className=" border p-10 rounded-lg  shadow-md  border-gray-200 bg-white w-1/4 h-3/4 ">
      <header className="font-bold m-3 mb-5 font-sans text-center text-lg">
        Expense Tracker
      </header>
      <span className="font-semibold ml-2">Username</span>
      <div className="p-1 border hover:border-2 border-black rounded-md m-2 ">
        <input
          type="text"
          placeholder="Enter Username"
          className="w-full outline-none"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <span className="font-semibold ml-2">Password</span>
      <div className="p-1 border hover:border-2 border-black rounded-md m-2 ">
        <input
          type="password"
          placeholder="Create Password"
          className="w-full outline-none"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <span className="font-semibold ml-2">Email</span>
      <div className="p-1 border hover:border-2 border-black rounded-md m-2 ">
        <input
          type="email"
          placeholder="Email"
          className="w-full outline-none"
          name="Eamil"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="m-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            context.signup(username, password, email);
          }}
          className="py-1 px-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;

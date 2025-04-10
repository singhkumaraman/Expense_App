import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { BsFillPersonCheckFill } from "react-icons/bs";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(GlobalContext);

  const loginSuccess = () => toast.success("🚀 Login Successful!");
  const loginFailed = () => toast.error("❌ Invalid Credentials!");

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("authToken", JSON.stringify(data.token));
      localStorage.setItem("user_id", JSON.stringify(data.user._id));
      localStorage.setItem("user", JSON.stringify(data.user.name));
      context.setUserId(data.user._id);
      context.setAuthToken(data.token);
      context.setUser(data.user.name);
      loginSuccess();
      nav("/");
    } else {
      loginFailed();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-200 to-yellow-100 px-4 py-12">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-center justify-center text-4xl font-extrabold text-indigo-700 mb-4 gap-2">
            <BsFillPersonCheckFill className="text-indigo-600 animate-bounce" />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </div>
          <p className="text-center text-gray-700 text-sm mb-6">
            Log in to access your dashboard ✨
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              🚀 Log In
            </button>

            <p className="text-sm text-center text-gray-700 mt-4">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-indigo-600 hover:underline"
              >
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
};

export default Login;

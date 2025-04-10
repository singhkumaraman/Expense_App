import React, { useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupSuccess = () => toast.success("🎉 Account created successfully!");
  const signupFailed = () => toast.error("❌ Signup Failed. Try again!");

  const signupSchema = z.object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const signup = async (name, password, email) => {
    const validation = signupSchema.safeParse({ name, email, password });

    if (!validation.success) {
      toast.error("🚫 Invalid input values");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 200) {
        signupSuccess();
        navigate("/login");
      } else {
        signupFailed();
      }
    } catch (err) {
      console.error(err);
      signupFailed();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password, email);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-200 to-yellow-100 px-4 py-12">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-center justify-center text-4xl font-extrabold text-indigo-700 mb-4 gap-2">
            <BsFillPersonPlusFill className="text-indigo-600 animate-bounce" />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Create Account
            </span>
          </div>
          <p className="text-center text-gray-700 text-sm mb-6">
            Sign up and join the journey 🚀
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white/70 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-300"
                placeholder="Your name"
              />
            </div>

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
              ✨ Sign Up
            </button>

            <p className="text-sm text-center text-gray-700 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-indigo-600 hover:underline"
              >
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
};

export default SignUp;

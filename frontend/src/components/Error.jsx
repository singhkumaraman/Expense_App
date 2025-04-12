import React from "react";
import { Link } from "react-router-dom";

const Error = ({
  code = "500",
  title = "Internal Server Error",
  message = "Oops! Something went wrong. Please try again later.",
  image = "/assets/404.png",
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl border border-gray-200 text-center">
        {image && (
          <div className="flex justify-center items-center mb-6">
            <img
              src={image}
              alt="Error illustration"
              className="w-40 h-40 object-contain"
            />
          </div>
        )}

        <h1 className="text-6xl lg:text-8xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-4">
          {code}
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {title}
        </h2>

        <p className="text-gray-600 text-md mb-6 leading-relaxed">{message}</p>

        <Link
          to="/login"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default Error;

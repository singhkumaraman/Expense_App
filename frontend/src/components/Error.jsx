import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
const Error = () => {
  return (
    <>
      <Header />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-blue-500">
              500
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Internal Server Error.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              We are really sorry the page you are looking does not exists.{" "}
            </p>
          </div>
          <div className="py-3 px-5 m-auto text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:bg-blue-800">
            <Link to="/">Home</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;

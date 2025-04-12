import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
const Home = React.lazy(() => import("./pages/Home.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const SignUp = React.lazy(() => import("./pages/Register.jsx"));
const Analytics = React.lazy(() => import("./pages/Analytics.jsx"));
const Contact = React.lazy(() => import("./components/Contact.jsx"));
const Error = React.lazy(() => import("./components/Error.jsx"));
const PrivateRoute = React.lazy(() => import("./Routes/PrivateRoutes.jsx"));

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-tr from-purple-300 via-pink-200 to-yellow-100">
          <Header />
          <Suspense
            fallback={<div className="text-center mt-10">Loading...</div>}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route index path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/expenseform"
                element={
                  <PrivateRoute>
                    <ExpenseForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <PrivateRoute>
                    <Analytics />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;

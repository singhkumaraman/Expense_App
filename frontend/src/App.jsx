import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import PrivateRoute from "./Routes/PrivateRoutes.jsx";
import SignUp from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import Analytics from "./pages/Analytics.jsx";
import Error from "./components/Error.jsx";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route element={<Login />} index />
            <Route element={<SignUp />} exact path="/signup" />
            <Route element={<Contact />} exact path="/contact" />
            <Route
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
              exact
              path="/analytics"
            />
            <Route path="*" element={<Error />}></Route>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;

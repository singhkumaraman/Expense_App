import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import PrivateRoute from "./Routes/PrivateRoutes.jsx";
import SignUp from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./components/Contact.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Login />} index />
        <Route element={<SignUp />} exact path="/signup" />
        <Route element={<Contact />} exact path="/contact" />
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
    </BrowserRouter>
  );
};

export default App;

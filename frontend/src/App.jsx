import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import PrivateRoute from "./Routes/PrivateRoutes.jsx";
import SignUp from "./pages/Register.jsx";
const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} index />
          <Route element={<SignUp />} exact path="/signup" />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;

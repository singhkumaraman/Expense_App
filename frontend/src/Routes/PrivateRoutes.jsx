import { React, useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
function PrivateRoute({ children }) {
  const context = useContext(GlobalContext);
  return context.user ? children : <Navigate to="/home" />;
}
export default PrivateRoute;

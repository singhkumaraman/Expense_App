import { React, useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
function PrivateRoute({ children }) {
  const context = useContext(GlobalContext);
  console.log(context.token);
  return context.user !== null ? children : <Navigate to="/*" />;
}
export default PrivateRoute;

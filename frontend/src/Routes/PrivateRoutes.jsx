import { React, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
function PrivateRoute({ children }) {
  const context = useContext(GlobalContext);
  const [wait, setwait] = useState(true);
  setTimeout(() => {
    setwait(false);
  }, !context.user);
  if (wait) {
    return;
    <>
      <h2>loading...</h2>
    </>;
  }
  return context.user !== null ? children : <Navigate to="/*" />;
}
export default PrivateRoute;

import { React, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
function PrivateRoute({ children }) {
  const { token } = useContext(GlobalContext);
  const [wait, setwait] = useState(true);
  setTimeout(() => {
    setwait(false);
  }, !token);
  if (wait) {
    return;
    <>
      <h2>loading...</h2>
    </>;
  }
  return token !== null ? children : <Navigate to="/*" />;
}
export default PrivateRoute;

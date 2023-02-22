import React, {useContext} from "react";
import {Navigate} from "react-router-dom";

import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({children}) => {
  const authContext = useContext(AuthContext);

  const {user} = authContext;

  return !user ? <Navigate to="/" /> : children;
};

export default PrivateRoute;

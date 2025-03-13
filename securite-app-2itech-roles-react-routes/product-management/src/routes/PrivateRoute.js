import React from "react";
import AuthService from "../services/authService";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({element}) => {

return AuthService.isLoggedIn() ? element : <Navigate to="/error" />;

};

export default PrivateRoute;
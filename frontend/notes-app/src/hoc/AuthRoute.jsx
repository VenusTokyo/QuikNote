import { Navigate } from "react-router-dom";

const AuthRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return !isAuthenticated ? <Component {...rest} /> : <Navigate to='/' />;
};

export default AuthRoute;

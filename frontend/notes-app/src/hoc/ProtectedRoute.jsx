import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Component {...rest} /> : <Navigate to='/login' />;
};

export default ProtectedRoute;

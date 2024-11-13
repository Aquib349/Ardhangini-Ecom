import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const accessToken = Cookies.get("accessToken");

  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;

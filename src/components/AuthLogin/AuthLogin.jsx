import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLoginRoute = () => {
    // const account = useSelector((state) => state.user);

    // if (account && account.id) {
    //     return <Navigate to="/" replace />;
    // }

    return <Outlet />;
};

export default AuthLoginRoute;

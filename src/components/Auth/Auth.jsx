import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = () => {
    const account = useSelector((state) => state.user);

    // Nếu chưa đăng nhập, điều hướng về trang Login
    if (!account || !account.id) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ message: "Please login!" }}
            />
        );
    }

    return <Outlet />; // Nếu đã đăng nhập, hiển thị nội dung của route con
};

export default AuthRoute;

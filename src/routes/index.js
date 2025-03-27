import {
    HomeOutlined,
    MessageOutlined,
    UserOutlined,
    // TeamOutlined,
    // AppstoreOutlined,
    // CalendarOutlined,
    // PictureOutlined,
    // VideoCameraOutlined,
    NotificationFilled,
} from "@ant-design/icons";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import NotificationPage from "../pages/Notification";
import MainLayout from "../components/Layout/MainLayout";
import AuthRoute from "../components/Auth";
import RegisterPage from "../pages/Register";
import AuthLoginRoute from "../components/AuthLogin/AuthLogin";

const PATH = {
    HOME: "/",
    LOGIN: "/login",
    PROFILE: "/profile",
    NOTIFICATION: "/notification",
    REGISTER: "/register",
};

const PAGE = {
    MainLayout: MainLayout,
    Home: HomePage,
    Login: LoginPage,
    Profile: ProfilePage,
    Notification: NotificationPage,
    Register: RegisterPage,
    Auth: AuthRoute,
    AuthLoginRoute: AuthLoginRoute,
};

const ROUTE = [
    { key: "/", icon: HomeOutlined, label: "Home" },
    { key: "/profile", icon: UserOutlined, label: "Profile" },
    { key: "/notification", icon: NotificationFilled, label: "Notification" },
];

export { PAGE, PATH };
export default ROUTE;

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
import Profile from "../pages/Profile";
import Notification from "../pages/Notification";
import MainLayout from "../components/Layout/MainLayout";

const PATH = {
    HOME: "/",
    LOGIN: "/login",
    PROFILE: "/profile",
    NOTIFICATION: "/notification",
};

const PAGE = {
    MainLayout: MainLayout,
    Home: HomePage,
    Login: LoginPage,
    Profile: Profile,
    Notification: Notification,
};

const ROUTE = [
    { key: "/", icon: HomeOutlined, label: "Home" },
    { key: "/profile", icon: UserOutlined, label: "Profile" },
    { key: "/notification", icon: NotificationFilled, label: "Notification" },
];

export { PAGE, PATH };
export default ROUTE;

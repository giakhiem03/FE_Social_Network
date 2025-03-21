import {
    HomeOutlined,
    MessageOutlined,
    UserOutlined,
    // TeamOutlined,
    // AppstoreOutlined,
    // CalendarOutlined,
    // PictureOutlined,
    // VideoCameraOutlined,
} from "@ant-design/icons";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import Profile from "../pages/Profile";
import MainLayout from "../components/Nav/MainLayout";

const PATH = {
    HOME: "/",
    LOGIN: "/login",
    PROFILE: "/profile",
};

const PAGE = {
    MainLayout: MainLayout,
    Home: HomePage,
    Login: LoginPage,
    Profile: Profile,
};

const ROUTE = [
    { key: "/", icon: HomeOutlined, label: "Home" },
    { key: "/profile", icon: UserOutlined, label: "Profile" },
];

export { PAGE, PATH };
export default ROUTE;

import { useLocation, useNavigate } from "react-router";
import { Menu } from "antd";
import ROUTE from "../../routes";

function MenuLeftHome() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            style={{
                height: "100%",
                borderRight: 0,
                userSelect: "none",
            }}
            items={ROUTE.map((item) => ({
                key: item.key,
                icon: <item.icon />,
                label: item.label,
            }))}
        />
    );
}

export default MenuLeftHome;

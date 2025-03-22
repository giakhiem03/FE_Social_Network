import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { PATH, PAGE } from "./routes";
import "@ant-design/v5-patch-for-react-19";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATH.LOGIN} element={<PAGE.Login />}></Route>
                <Route path={PATH.HOME} element={<PAGE.MainLayout />}>
                    <Route index element={<PAGE.Home />}></Route>
                    <Route
                        path={PATH.PROFILE}
                        element={<PAGE.Profile />}
                    ></Route>
                    <Route
                        path={PATH.NOTIFICATION}
                        element={<PAGE.Notification />}
                    ></Route>
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </BrowserRouter>
    );
}

export default App;

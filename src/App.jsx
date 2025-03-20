import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import PATH, { PAGE } from "./routes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATH.LOGIN} element={<PAGE.Login />}></Route>
                <Route path={PATH.HOME} element={<PAGE.Home />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

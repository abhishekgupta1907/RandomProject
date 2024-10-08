import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ViewData from "./components/ViewData";
import InsertData from "./components/InsertData";
import UpdateData from "./components/UpdateData";
import DeleteData from "./components/DeleteData";
import ChangePassword from "./components/ChangePassword";
import SideBar from "./components/SideBar/SideBar";
import LoginPage from "./components/LoginPage/LoginPage";

const App = () => {
    return (
        <Router>
            <div className="App">
                <SideBar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/view" element={<ViewData />} />
                        <Route path="/insert" element={<InsertData />} />
                        <Route path="/update" element={<UpdateData />} />
                        <Route path="/delete" element={<DeleteData />} />
                        <Route
                            path="/change-password"
                            element={<ChangePassword />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

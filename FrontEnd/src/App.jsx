import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import "./App.css";
import ViewData from "./components/ViewData";
import InsertData from "./components/InsertData";
import UpdateData from "./components/UpdateData";
import DeleteData from "./components/DeletData/DeleteData";
import ChangePassword from "./components/ChangePassword";
import SideBar from "./components/SideBar/SideBar";
import LoginPage from "./components/LoginPage/LoginPage";
import { useState } from "react";
import HomePage from "./components/HomePage";

const App = () => {
    const [user, setUser] = useState(null);
    const [loggedUser, setLoggedUser] = useState(false);
    return (
        <Router>
            <div className="App">
                {loggedUser ? (
                    <>
                        <SideBar
                            loggedUser={loggedUser}
                            setLoggedUser={setLoggedUser}
                            user={user}
                            setUser={setUser}
                        />{" "}
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/view" element={<ViewData />} />
                                <Route
                                    path="/insert"
                                    element={<InsertData />}
                                />
                                <Route
                                    path="/update"
                                    element={<UpdateData />}
                                />
                                <Route
                                    path="/delete"
                                    element={<DeleteData />}
                                />
                                <Route
                                    path="/change-password"
                                    element={<ChangePassword />}
                                />
                            </Routes>
                        </div>
                    </>
                ) : (
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <LoginPage
                                    loggedUser={loggedUser}
                                    setLoggedUser={setLoggedUser}
                                    user={user}
                                    setUser={setUser}
                                />
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
};

export default App;

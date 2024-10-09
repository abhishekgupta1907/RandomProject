import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ViewData from "./components/ViewData";
import InsertData from "./components/InsertData";
import UpdateData from "./components/UpdateData";
import DeleteData from "./components/DeleteData";
import ChangePassword from "./components/ChangePassword";
import SideBar from "./components/SideBar/SideBar";
import LoginPage from "./components/LoginPage/LoginPage";
import { useState } from "react";

const App = () => {
    const [loggedUser, setLoggedUser] = useState(false);
    return (
        <Router>
            <div className="App">
                {loggedUser ? (
                    <>
                        <SideBar />{" "}
                        <div className="content">
                            <Routes>
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
                    <LoginPage
                        loggedUser={loggedUser}
                        setLoggedUser={setLoggedUser}
                    />
                )}
            </div>
        </Router>
    );
};

export default App;

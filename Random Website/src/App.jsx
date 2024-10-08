import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OffCanvasMenu from "./components/OffCanvasMenu";
import ViewData from "./components/ViewData";
import InsertData from "./components/InsertData";
import UpdateData from "./components/UpdateData";
import DeleteData from "./components/DeleteData";
import ChangePassword from "./components/ChangePassword";

const App = () => {
    return (
        <Router>
            <div className="d-flex">
                <OffCanvasMenu />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<ViewData />} />
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

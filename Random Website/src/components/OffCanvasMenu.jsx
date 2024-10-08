import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdViewList, MdAdd, MdEdit, MdDelete, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";

const OffCanvasMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={toggleMenu}>
                <FaBars />
            </button>

            <div
                className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
                tabIndex="-1"
                style={{ visibility: isOpen ? "visible" : "hidden" }}
                onClick={toggleMenu}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={toggleMenu}
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-unstyled">
                        <li>
                            <Link to="/" onClick={toggleMenu}>
                                <MdViewList />
                                View Data
                            </Link>
                        </li>
                        <li>
                            <Link to="/insert" onClick={toggleMenu}>
                                <MdAdd />
                                Insert Data
                            </Link>
                        </li>
                        <li>
                            <Link to="/update" onClick={toggleMenu}>
                                <MdEdit />
                                Update Data
                            </Link>
                        </li>
                        <li>
                            <Link to="/delete" onClick={toggleMenu}>
                                <MdDelete />
                                Delete Data
                            </Link>
                        </li>
                        <li>
                            <Link to="/change-password" onClick={toggleMenu}>
                                <MdLock />
                                Change Password
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OffCanvasMenu;

import { NavLink } from "react-router-dom";
import { FaBars, FaEye, FaPlus, FaEdit, FaTrash, FaKey } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const routes = [
    { path: "/view", name: "View Data", icon: <FaEye /> },
    { path: "/insert", name: "Insert Data", icon: <FaPlus /> },
    { path: "/update", name: "Update Data", icon: <FaEdit /> },
    { path: "/delete", name: "Delete Data", icon: <FaTrash /> },
    { path: "/change-password", name: "Change Password", icon: <FaKey /> },
];

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const showAnimation = {
        hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
        show: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            animate={{
                width: isOpen ? "200px" : "45px",
                transition: { duration: 0.5, type: "spring", damping: 10 },
            }}
            className="sidebar"
        >
            <div className="top_section">
                <AnimatePresence>
                    {isOpen && (
                        <motion.h1
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="logo"
                        >
                            DoSomeCoding
                        </motion.h1>
                    )}
                </AnimatePresence>
                <FaBars onClick={toggle} className="bars" />
            </div>
            <section className="routes">
                {routes.map((route, index) => (
                    <NavLink to={route.path} key={index} className="link">
                        <div className="icon">{route.icon}</div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="link_text"
                                >
                                    {route.name}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </NavLink>
                ))}
            </section>
        </motion.div>
    );
};

export default SideBar;

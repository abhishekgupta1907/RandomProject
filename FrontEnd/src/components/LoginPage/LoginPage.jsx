/* eslint-disable react/prop-types */

import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginPage({ setLoggedUser }) {
    const [invalidUser, setInvalidUser] = useState(false);
    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        Email: "",
        Password: "",
    });
    const [formdata1, setFormData1] = useState({
        Name: "",
        Email: "",
        Password: "",
    });
    async function asyncAwait(e) {
        e.preventDefault(); // Prevent form submission

        // Check if both Email and Password are filled
        if (!formdata.Email || !formdata.Password) {
            alert("Both email and password must be filled");
            return;
        }
        // Convert id to number if necessary
        const Data = {
            ...formdata,
        };

        let config = {
            method: "POST",
            url: "http://localhost:5000/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: Data,
        };

        try {
            const response = await axios(config);
            console.log("user:", response.data); // Log the success response
            setLoggedUser(true);
            navigate("/view");
            setFormData({ Email: "", Password: "" }); // Reset form after successful submission
        } catch (error) {
            setInvalidUser(true);
            setFormData({ Email: "", Password: "" });
            console.error("Error adding data:", error);
        }
    }
    async function asyncAwait1(e) {
        e.preventDefault(); // Prevent form submission

        // Check if both Email and Password are filled
        if (!formdata1.Email || !formdata1.Password || !formdata1.Name) {
            return;
        }
        // Convert id to number if necessary
        const Data = {
            ...formdata1,
        };

        let config = {
            method: "POST",
            url: "http://localhost:5000/register",
            headers: {
                "Content-Type": "application/json",
            },
            data: Data,
        };

        try {
            const response = await axios(config);
            console.log("user:", response.data); // Log the success response
            handleLoginClick();
            setFormData({ Name: "", Email: "", Password: "" }); // Reset form after successful submission
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    return (
        <div className="body">
            <div
                className={`container ${isActive ? "active" : ""}`}
                id="container"
            >
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon">
                                <i className="fa-brands fa-google-plus-g"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            placeholder="Name"
                            value={formdata1.Name}
                            onChange={(e) =>
                                setFormData1({
                                    ...formdata1,
                                    Name: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formdata1.Email}
                            onChange={(e) =>
                                setFormData1({
                                    ...formdata1,
                                    Email: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formdata1.Password}
                            onChange={(e) =>
                                setFormData1({
                                    ...formdata1,
                                    Password: e.target.value,
                                })
                            }
                            required
                        />
                        <button type="submit" onClick={asyncAwait1}>
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon">
                                <i className="fa-brands fa-google-plus-g"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-github"></i>
                            </a>
                            <a href="#" className="icon">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your email and password</span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formdata.Email}
                            onChange={(e) =>
                                setFormData({
                                    ...formdata,
                                    Email: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formdata.Password}
                            onChange={(e) =>
                                setFormData({
                                    ...formdata,
                                    Password: e.target.value,
                                })
                            }
                            required
                        />
                        {invalidUser && (
                            <div style={{ color: "red", fontSize: "20px" }}>
                                Invalid User
                            </div>
                        )}
                        <button type="submit" onClick={asyncAwait}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                Enter your personal details to use all site
                                features
                            </p>
                            <button
                                className="hidden"
                                onClick={handleLoginClick}
                                id="login"
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Register with your personal details to use all
                                site features
                            </p>
                            <button
                                className="hidden"
                                onClick={handleRegisterClick}
                                id="register"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

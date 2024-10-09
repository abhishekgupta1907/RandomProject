/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css"; // Make sure the CSS is linked correctly

function ChangePassword() {
    const [passwords, setPasswords] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            setErrorMessage("New password and confirm password do not match");
            return;
        }

        if (
            !passwords.email ||
            !passwords.currentPassword ||
            !passwords.newPassword ||
            !passwords.confirmPassword
        ) {
            setErrorMessage("All fields must be filled");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/change-password",
                {
                    email: passwords.email,
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                }
            );

            setSuccessMessage("Password changed successfully");
            alert("Password changed successfully");
            setErrorMessage("");
            setPasswords({
                email: "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            setErrorMessage(
                "Error changing password: " + error.response?.data?.message ||
                    error.message
            );
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={passwords.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
            )}
        </div>
    );
}

export default ChangePassword;

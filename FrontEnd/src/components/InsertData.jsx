import { useState } from "react";
import axios from "axios";

const InsertData = () => {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        city: "",
    });

    async function asyncAwait() {
        // Convert id to number if necessary
        const Data = {
            ...formData,
            id: parseInt(formData.id, 10), // Convert id to number
        };

        let config = {
            method: "POST",
            url: "http://localhost:5000/insert",
            headers: {
                "Content-Type": "application/json",
            },
            data: Data,
        };

        try {
            const response = await axios(config);
            console.log("data added:", response.data); // Log the success response
            alert("data added successfully!");
            setFormData({ name: "", id: "", city: "" }); // Reset form after successful submission
        } catch (error) {
            console.error("Error adding data:", error); // Log the error
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.inputGroup}>
                <label htmlFor="id" style={styles.label}>
                    ID:
                </label>
                <input
                    type="text"
                    id="id"
                    style={styles.input}
                    value={formData.id}
                    onChange={(e) =>
                        setFormData({ ...formData, id: e.target.value })
                    }
                />
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    style={styles.input}
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
            </div>
            <div style={styles.inputGroup}>
                <label htmlFor="city" style={styles.label}>
                    City:
                </label>
                <input
                    type="text"
                    id="city"
                    style={styles.input}
                    value={formData.city} // This is the city field now
                    onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                    }
                />
            </div>
            <button style={styles.button} onClick={asyncAwait}>
                Submit
            </button>
        </div>
    );
};

// Inline styles for the component
const styles = {
    container: {
        width: "300px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
    },
    inputGroup: {
        marginBottom: "15px",
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
    },
    button: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#218838",
    },
};

export default InsertData;

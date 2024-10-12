import { useState } from "react";
import axios from "axios";

const InsertData = () => {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        city: "",
        image: null,
    });

    async function asyncAwait() {
        // Convert id to number if necessary
        const Data = new FormData();
        Data.append("id", formData.id);
        Data.append("name", formData.name);
        Data.append("city", formData.city);
        Data.append("image", formData.image);

        let config = {
            method: "POST",
            url: "http://localhost:5000/insert",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: Data,
        };

        try {
            const response = await axios(config);
            console.log("data added:", response.data);
            alert("data added successfully!");
            setFormData({ name: "", id: "", city: "", image: null }); // Reset form after successful submission
        } catch (error) {
            alert("insert valid data");
            console.error("Error adding data:", error); // Log the error
        }
    }
    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setFormData({ ...formData, image: e.target.files[0] });
    };

    return (
        <>
            <h1 style={styles.title}> Insert Data</h1>
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
                <div style={styles.inputGroup}>
                    <label htmlFor="image" style={styles.label}>
                        Upload Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        style={styles.input}
                        accept="image/*"
                        onChange={handleImageChange} // Handle image selection
                    />
                </div>
                <button style={styles.button} onClick={asyncAwait}>
                    Submit
                </button>
            </div>
        </>
    );
};

// Inline styles for the component
const styles = {
    container: {
        width: "400px",
        height: "auto",
        margin: "20px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
    },
    title: {
        marginTop: "20px",
        textAlign: "center",
        fontSize: "2rem",
        color: "#333",
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

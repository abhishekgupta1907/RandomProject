import axios from "axios";
import { useState } from "react";
import "./DeleteData.css";

const DeleteData = () => {
    const [id, setId] = useState("");

    async function asyncAwait() {
        let config = {
            method: "delete",
            url: `http://localhost:5000/delete/${parseInt(id, 10)}`,
        };

        try {
            const response = await axios(config);
            console.log("Data deleted:", response.data);
            setId("");
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

    return (
        <div className="delete-data-container">
            <h1 className="delete-data-title">Delete Data</h1>
            <div className="delete-data-form">
                <input
                    type="text"
                    className="delete-data-input"
                    placeholder="Enter ID to delete"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button className="delete-data-button" onClick={asyncAwait}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteData;

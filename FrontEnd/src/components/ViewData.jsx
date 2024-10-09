import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewData.css";

const ViewData = () => {
    const [Data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            let config = {
                method: "get",
                url: "http://localhost:5000/",
            };

            try {
                const response = await axios(config);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    const handleViewClick = (data) => {
        setSelectedData(data);
    };

    return (
        <div className="view-data-container">
            <h1 className="view-data-title">View Data</h1>
            <table className="view-data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>City</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data) => (
                        <tr key={data.id}>
                            <td>{data.name}</td>
                            <td>{data.id}</td>
                            <td>{data.city}</td>
                            <td>
                                <button onClick={() => handleViewClick(data)}>
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render the blur overlay and card if an item is selected */}
            {selectedData && (
                <>
                    <div className="blur-overlay"></div>{" "}
                    {/* Blurred background overlay */}
                    <div className="selected-data-card">
                        <h2>Details for {selectedData.name}</h2>
                        <p>
                            <strong>ID:</strong> {selectedData.id}
                        </p>
                        <p>
                            <strong>City:</strong> {selectedData.city}
                        </p>
                        <button onClick={() => setSelectedData(null)}>
                            Close
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewData;

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
    }, [Data]);

    const handleViewClick = (data) => {
        setSelectedData(data);
    };

    async function asyncAwait(data) {
        let config = {
            method: "delete",
            url: `http://localhost:5000/delete/${parseInt(data.id, 10)}`,
        };

        try {
            const response = await axios(config);
            console.log("Data deleted:", response.data);
            alert("Data deleted successfully");
        } catch (error) {
            alert("No such data");
            console.error("Error deleting data:", error);
        }
    }

    return (
        <div className="view-data-container">
            <h1 className="view-data-title">View Data</h1>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>image</th>
                            <th>Name</th>
                            <th>ID</th>
                            <th>City</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((data) => (
                            <tr key={data.id}>
                                <td className="card-image">
                                    <img src={data.image} alt={data.name} />
                                </td>
                                <td>{data.name}</td>
                                <td>{data.id}</td>
                                <td>{data.city}</td>
                                <td className="card-actions">
                                    <button
                                        onClick={() => handleViewClick(data)}
                                    >
                                        View
                                    </button>
                                    <button onClick={() => asyncAwait(data)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedData && (
                <>
                    <div className="blur-overlay"></div>
                    <div className="selected-data-card">
                        <h2>Details for {selectedData.name}</h2>
                        <p>
                            <strong>ID:</strong> {selectedData.id}
                        </p>
                        <p>
                            <strong>City:</strong> {selectedData.city}
                        </p>
                        <img src={selectedData.image} alt={selectedData.name} />
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

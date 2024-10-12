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
        <>
            <div className="view-data-container">
                <h1 className="view-data-title">View Data</h1>
                <div className="card-list">
                    {Data.map((data) => (
                        <div key={data.id} className="card">
                            <div className="card-image">
                                {data.image && data.imageType ? (
                                    <img
                                        src={`data:${data.imageType};base64,${data.image}`}
                                        alt={data.name}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                ) : (
                                    <p>No image available</p>
                                )}
                            </div>
                            <div className="card-content">
                                <h2>{data.name}</h2>
                                <p>ID: {data.id}</p>
                                <p>City: {data.city}</p>
                                <div className="card-actions">
                                    <button
                                        onClick={() => handleViewClick(data)}
                                    >
                                        View
                                    </button>
                                    <button onClick={() => asyncAwait(data)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
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
                            <div>
                                <img
                                    src={`data:image/png;base64,${selectedData.image}`}
                                    alt={selectedData.name}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </div>
                            <button onClick={() => setSelectedData(null)}>
                                Close
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ViewData;

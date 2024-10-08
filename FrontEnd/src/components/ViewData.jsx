import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewData.css";

const ViewData = () => {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let config = {
                method: "get",
                url: "http://localhost:5000/",
            };

            try {
                const response = await axios(config);
                console.log("data:", response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    return (
        <div className="view-data-container">
            <h1 className="view-data-title">View Data</h1>
            <table className="view-data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data) => (
                        <tr key={data.id}>
                            <td>{data.name}</td>
                            <td>{data.id}</td>
                            <td>{data.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewData;

import React, { useState, useEffect } from "react";
import "../styles/labelList.css";
import { labelService } from "../services/LabelService";

function LabelList() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await labelService.labelList();
      setLabels(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Disease List</h2>

      <table className="label-table">
        <thead>
          <tr>
            <th>Disease Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label) => (
            <tr key={label.labelId}>
              <td>{label.labelName}</td>
              <td>{label.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LabelList;

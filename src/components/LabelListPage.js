import React, { useState, useEffect } from 'react';
import '../styles/labelList.css';

function LabelList() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/labels/list');
      if (!response.ok) {
        throw new Error('Failed to fetch labels');
      }
      const data = await response.json();
      setLabels(data);
    } catch (error) {
      console.error('Error fetching labels:', error);
    }
  };

  return (
    <div className="container">
      <h2>Disease List</h2>

      <table className="label-table">
        <thead>
          <tr>
            {/* <th>Label ID</th> */}
            <th>Disease Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label) => (
            <tr key={label.labelId}>
              {/* <td>{label.labelId}</td> */}
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

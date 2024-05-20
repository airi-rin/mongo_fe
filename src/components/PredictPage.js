import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import '../styles/predict.css';

const Predict = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event, url) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      setPrediction(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="predictPage">
      <h2>Predict</h2>
      <Form>
        <Form.Group controlId="formFile">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        {preview && (
          <div className="image-preview">
            <h4>Image Preview:</h4>
            <Image src={preview} thumbnail />
          </div>
        )}
        <div className="buttons">
          <Button
            variant="primary"
            type="submit"
            onClick={(event) => handleSubmit(event, 'http://localhost:5000/api/labels/predict/no-resnet')}
            className="btn-primary"
          >
            Model no resnet
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={(event) => handleSubmit(event, 'http://localhost:5000/api/labels/predict/resnet')}
            className="btn-primary"
          >
            Model resnet
          </Button>
        </div>
      </Form>
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default Predict;

import React, { useState } from "react";
import axios from "axios";

const MLIntegration = () => {
  const [features, setFeatures] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Split the input string into an array of features
      const featuresArray = features.split(",").map((f) => f.trim());

      const response = await axios.post("http://localhost:8000/predict", {
        features: featuresArray,
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div>
      <h1>ML Model Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Features (comma-separated, e.g., fever, cough):
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </label>
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div>
          <h2>Prediction:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default MLIntegration;

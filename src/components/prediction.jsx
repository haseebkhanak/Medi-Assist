import React, { useState } from "react";
import axios from "axios";

const MLIntegration = () => {
  const [features, setFeatures] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    console.log(features)
    e.preventDefault();
    if(features.length===0)
    {
      alert("Plz Select Symptoms!")
      return
    }

    if(features.length<3)
      {
        alert("Select more than two symptoms")
        return
      }
    
    try {
      const featuresArray = features
      const response = await axios.post("http://localhost:8000/predict", {
        features:featuresArray
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
<input id="default-checkbox" type="checkbox" value="fever"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fever</label> <br />

<input id="default-checkbox" type="checkbox" value="headache"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Headache</label> <br />

<input id="default-checkbox" type="checkbox" value="pain in body"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pain In Body</label> <br />

<input id="default-checkbox" type="checkbox" value="nausea"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nausea</label> <br />

<input id="default-checkbox" type="checkbox" value="vomiting"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }}
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vomiting</label> <br />

<input id="default-checkbox" type="checkbox" value="skin rash"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Skin Rash</label> <br />

<input id="default-checkbox" type="checkbox" value="runny nose"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Runny Nose</label> <br />

<input id="default-checkbox" type="checkbox" value="cough"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cough</label> <br />

<input id="default-checkbox" type="checkbox" value="sore throat"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sore Throat</label> <br />

<input id="default-checkbox" type="checkbox" value="sweating"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sweating</label> <br />

<input id="default-checkbox" type="checkbox" value="diarrhea"  
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Diarrhea</label> <br />

<input id="default-checkbox" type="checkbox" value="taste loss"   
onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }} 
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Taste Loss</label> <br />

<input id="default-checkbox" type="checkbox" value="fatigue" 
  onChange={(e) => {
    const { checked, value } = e.target;
    setFeatures((prevFeatures) =>
      checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
    );
  }}
className="w-4 h-4 text-green-600 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fatigue</label> <br />


        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div>
          <h2>Disease:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default MLIntegration;

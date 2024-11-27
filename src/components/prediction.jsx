import React, { useState } from "react";
import axios from "axios";

const MLIntegration = () => {
  const [features, setFeatures] = useState("");
  const [diseasePrediction, setPrediction] = useState(null);
  const [recommendedMedicines, setRecommendation] = useState(null);
  const [prescription, setPrescription] = useState(null);

  const handleSubmit = async (e) => {
    console.log(features)
    e.preventDefault();
    if(features.length===0)
    {
      alert("Plz Select Symptoms!")
      return
    }

    // if(features.length<3)
    //   {
    //     alert("Select more than two symptoms")
    //     return
    //   }
    
    try {
      const featuresArray = features
      const response = await axios.post("http://localhost:4000/predict", {
        features:featuresArray
      });
      setPrediction(response.data.diseasePrediction);
      setRecommendation(response.data.recommendedMedicines);

      if(response.data.diseasePrediction==="COVID"){
        setPrescription(`For COVID-19, initiate antiviral treatment for hospitalized patients requiring oxygen support,
         and provide corticosteroids to reduce inflammation; ensure supportive care with hydration;
         monitor for worsening symptoms; recommend over-the-counter medications for fever and pain management;
         and advise on the use of a pulse oximeter to track oxygen levels at home.`)
        return
      }
  
      else if(response.data.diseasePrediction==="MALARIA"){
        setPrescription(`For malaria, initiate appropriate antimalarial therapy based on severity and type of malaria;
         ensure treatment is taken with food for better absorption;
         educate the patient on prevention measures such as the use of insecticide-treated bed nets;
         and instruct on recognizing signs of complications that require immediate medical attention.`)
         return
      }

      else if(response.data.diseasePrediction==="IMFLUENZA"){
        setPrescription(`For influenza, begin antiviral treatment if symptoms started within the last 48 hours;
         encourage rest and hydration; recommend supportive care measures to relieve symptoms;
         advise on over-the-counter medications for fever and discomfort;
         and stress the importance of annual vaccinations for prevention.`)
         return
      }

      else if(response.data.diseasePrediction==="PNEUMONIA"){
        setPrescription(`For pneumonia, initiate appropriate antibiotic therapy based on the suspected causative agent;
         provide supportive care with hydration and rest; monitor for respiratory distress;
         advise on cough management techniques; and schedule follow-up evaluations
         to assess recovery and response to treatment.`)
         return
      }

      else if(response.data.diseasePrediction==="DENGUE"){
        setPrescription(`For dengue fever, Paracetamol is used for pain and fever, while NSAIDs and aspirin are avoided due to bleeding risks. </br>
         Hydration is crucial, using ORS or IV fluids if necessary, along with regular fluid intake.
         Platelet monitoring is essential to prevent complications, and severe cases may require hospitalization.
         Patients should rest, use cool compresses for comfort, and prevent mosquito bites.
         Emergency care is needed for severe symptoms like bleeding or abdominal pain.
         Apple juice are recommended.`)
         return
      }

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


        <button type="submit">Predict</button> <br />
      </form>
      {diseasePrediction && (
        <div>
          <h2>Disease:</h2>
          <p>{diseasePrediction}</p> <br />
        </div>
      )}

      {recommendedMedicines &&(
        <div>
        <h2>Medicines:</h2>
        <p>{recommendedMedicines}</p> <br />
      </div>
      )}

{prescription &&(
        <div>
        <h2>PRESCRIPTION:</h2>
        <p>{prescription}</p>
      </div>
      )}
    </div>
  );
};

export default MLIntegration;

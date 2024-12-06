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
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">AI-Powered Health Diagnosis</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Symptoms</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "fever",
            "headache",
            "pain in body",
            "nausea",
            "vomiting",
            "skin rash",
            "runny nose",
            "cough",
            "sore throat",
            "sweating",
            "diarrhea",
            "taste loss",
            "fatigue",
          ].map((symptom) => (
            <label key={symptom} className="flex items-center">
              <input
                type="checkbox"
                value={symptom}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setFeatures((prevFeatures) =>
                    checked ? [...prevFeatures, value] : prevFeatures.filter((feature) => feature !== value)
                  );
                }}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-gray-700 capitalize">{symptom}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-pink-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </form>

      {diseasePrediction && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Disease Prediction:</h2>
          <p className="text-gray-600 mt-2">{diseasePrediction}</p>
        </div>
      )}

      {recommendedMedicines && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Recommended Medicines:</h2>
          <p className="text-gray-600 mt-2">{recommendedMedicines}</p>
        </div>
      )}

      {prescription && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Prescription:</h2>
          <p className="text-gray-600 mt-2">{prescription}</p>
        </div>
      )}
    </div>
  );
};

export default MLIntegration;

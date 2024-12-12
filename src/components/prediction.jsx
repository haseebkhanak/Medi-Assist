import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from './images/logo.png';

const MLIntegration = () => {
  const [features, setFeatures] = useState("");
  const [diseasePrediction, setPrediction] = useState(null);
  const [recommendedMedicines, setRecommendation] = useState(null);
  const [prescription, setPrescription] = useState(null);
  const [message, setMessage] = useState('')
  const [invalidSymptoms, setinvalidSymptoms] = useState('')

  const navigate = useNavigate()
  const patient_login = () => {
    navigate("/patient-login")
  }

  const patient_home_dashboard = () => {
    navigate('/patientlogoutHome')
  }

  const about_us = () => {
    navigate("/about-us")
  }

  const navigateDermProfile = useNavigate()
  const DermProfile = () => {
    navigateDermProfile('/derm_profiles')
  }

  const fetchusername = async () => {

    try {
      const res = await fetch('http://localhost:2000/patienthome',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const result = await res.json()
      setMessage(result)
      console.log(result)
    }
    catch (error) {
      console.log("Error ", error)
    }
  }

  useEffect(() => {
    fetchusername()
  }, [])

  const destroysession = async () => {
    try {
      const res = await fetch('http://localhost:2000/patientlogedOut',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const result = await res.json()
      console.log(result.message)

      if (res.ok) {
        patient_login()
      }
    } catch (error) {
      console.log("Error ", error)
    }
  }

  const cancelSvg = () => {
    document.querySelector(".doctorprofiles").style.display = "none"
  }

  const showProfiles = () => {
    document.querySelector(".doctorprofiles").style.display = "block"
  }

  const handleSubmit = async (e) => {
    console.log(features)
    e.preventDefault();
    if (features.length === 0) {
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
        features: featuresArray
      });
      if(response.data.type!=="success")
      {
        setinvalidSymptoms(response.data.invalidSymptoms)
        // console.log(response.data.invalidSymptoms)
        setPrediction('')
        setPrescription('')
        setRecommendation('')
        return
      }
      
      else{
      setPrediction(response.data.diseasePrediction);
      setRecommendation(response.data.recommendedMedicines);
      setinvalidSymptoms('')

      if (response.data.diseasePrediction === "COVID") {
        setPrescription(`If you have COVID-19 and are more likely to get very sick, medications are available that can reduce your risk of hospitalization and death.
Don't delay: Treatments must be started within 5-7 days after you first develop symptoms to be effective.If you think you could have COVID-19 and are at higher risk for severe illness, 
talk to your healthcare provider about testing and/or treatment right away, even if your symptoms are mild. `)
        return
      }

      else if (response.data.diseasePrediction === "MALARIA") {
        setPrescription(`Current WHO-recommended malaria chemopreventive therapies for people living in endemic areas 
          include intermittent preventive treatment of malaria in pregnancy, perennial malaria chemoprevention, 
          seasonal malaria chemoprevention, post-discharge malaria chemoprevention, and intermittent 
          preventive treatment of malaria for school-aged children. Chemoprophylaxis drugs are also given to 
          travellers before entering an area where malaria is endemic and can be highly effective when combined with insecticide-treated nets. `)
        return
      }

      else if (response.data.diseasePrediction === "INFLUENZA") {
        setPrescription(`For influenza, begin antiviral treatment if symptoms started within the last 48 hours;
         encourage rest and hydration; recommend supportive care measures to relieve symptoms;
         To diagnose the flu, also called influenza, your healthcare professional does a physical exam, 
         looks for symptoms of flu and possibly orders a test that detects flu viruses.`)
        return
      }

      else if (response.data.diseasePrediction === "PNEUMONIA") {
        setPrescription(`The best antibiotic to treat pneumonia will depend on several factors, 
          such as your type of pneumonia, age, lifestyle, and medical history. 
          Zithromax (azithromycin) is often the first-line treatment since it is effective against many different microbes that can cause pneumonia. 
          Other first-line antibiotics include Biaxin (clarithromycin) and Erythrocin (erythromycin).`)
        return
      }

      else if (response.data.diseasePrediction === "DENGUE") {
      setPrescription(`Recovering from dengue fever, drink plenty of fluids. 
        Call your doctor right away if you have any of the following signs and symptoms that you mentioned above. 
        Your doctor may also draw a sample of blood to be tested in a lab for evidence of infection with one of the dengue viruses.`)
        return
      }
    }
    } catch (error) {
      console.error("Error making prediction:", error);
    }

  };

  const reset=()=>{
    // resetRef.current.checked=false
    // setPrediction('')
    // setRecommendation('')
    // setPrescription('')
    window.location.reload(false);
  }

  return (
    <>
      <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
        <img src={Logo} alt="" className='logo' />
        <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

        <div>
          <button className="text-white ml-20 text-lg" onClick={patient_home_dashboard}>Home</button>
          <button className="text-white ml-20 text-lg" onClick={about_us}>About Us</button>
          <button className="text-white ml-20 text-lg" onClick={showProfiles}>Doctors Profiles</button>
        </div>

        <div className="flex relative">

          <div className="ml-20">
            <button className="absolute btn-logout bg-transparent border border-black-400 text-white px-2 py-1 rounded" onClick={destroysession} style={{ marginLeft: "100px" }}>LogOut</button>
            {message.message_name && (
              <p className='name text-white text-3xl' style={{ marginLeft: "220px" }}><i>Mr. {message.message_name}</i></p>
            )}

          </div>
        </div>
      </nav>

      <div className="doctorprofiles">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6" onClick={cancelSvg} style={{ marginLeft: 195, marginTop: 5, cursor: 'pointer' }}>
          <path d="M6 18 18 6M6 6l12 12" />
        </svg>
        <p className='text-center'><i>Find Doctors by speciality</i></p> <br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2' onClick={DermProfile}>Dermatologist</button> <br /> <br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Dentist</button> <br /> <br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Gynecologist</button> <br /><br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Gastrointrologist</button> <br /><br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>ENT Specialist</button> <br /><br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Urologist</button> <br /><br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Psychiatrist</button> <br /><br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>Neurologist</button> <br /><br />
        <button className='text-xl ml-10 hover:bg-transparent hover:text-pink-500 hover:border border-pink-600 hover:px-2 hover:py-2'>General Physician</button> <br /><br />
      </div>

      <br /> <br /> <br />
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 mt-5">
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
            className="w-full mt-4 bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-300 hover:text-pink-800"
          >
            Predict
          </button>

          <button
            onClick={reset}
            type="button"
            className="w-full mt-4 bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black hover:border border-black"
          >
            Reset
          </button>
        </form>

        {invalidSymptoms && (
          <div className="bg-red-200 shadow-lg border border-red-600 rounded-lg p-6 w-full max-w-md mt-6">
            <p className="text-red-800 mt-2 text-xl">{invalidSymptoms}</p>
          </div>
        )}

        {diseasePrediction && (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Disease Prediction:</h2>
            <p className="text-gray-600 mt-2 text-xl">{diseasePrediction}</p>
          </div>
        )}

        {recommendedMedicines && (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Recommended Medicines:</h2>
            <p className="text-gray-600 mt-2 text-xl">{recommendedMedicines} <br /></p>
          </div>
        )}

        {prescription && (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Prescription:</h2>
            <p className="text-gray-600 mt-2">{prescription}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MLIntegration;

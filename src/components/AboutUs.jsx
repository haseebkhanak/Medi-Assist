import Logo from './images/logo.png';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { BorderBeam } from './magicui/border-beam';
import { useState,useEffect } from 'react';

const AboutUs = () => {
    const [message, setMessage] = useState('')
    const navigate=useNavigate()

    const doc_login = () => {
        navigate("/doctor-login")
    }

    const patient_login = () => {
        navigate("/patient-login")
    }

    const navigateDermProfile = useNavigate()
    const DermProfile = () => {
      navigateDermProfile('/derm_profiles')
    }

    const prediction=()=>{
      navigate("/medicine-recommendation")
  }

    const crossSvg=()=>{
        document.querySelector(".blur").style.display = "none"
        document.querySelector("#doctorOrpatient").style.display= "none"
    }

    const cancelSvg = () => {
      document.querySelector(".doctorprofiles").style.display = "none"
    }
  
    const showProfiles = () => {
      document.querySelector(".doctorprofiles").style.display = "block"
    }

    const patient_home_dashboard = () => {
      navigate('/patientlogoutHome')
    }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

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

  return (
    <>
<div style={styles.container}>
    <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                    <img src={Logo} alt="" className='logo' />
                    <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                    <div>
                        <button  className="text-white ml-20 text-lg" onClick={patient_home_dashboard}>Home</button>
                        <button  className="text-white ml-10 text-lg" onClick={showProfiles}>Doctors Profiles</button>
                    </div>

                    <div className="ml-20">
            <button className="text-xl bg-transparent border border-black-800 text-white px-2 py-1 rounded" onClick={prediction}> Health Diagnosis</button>
            </div>

                    <div className="flex relative">

<div>
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

      <motion.div
        style={styles.animatedBackground}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      <motion.div className='mt-20 bg-white'
        style={styles.banner}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 style={styles.heading} className='text-pink-500'>About Us</h1>
        <p style={styles.subHeading} className='text-black ml-12'>
        At Medi Assist, we believe in a future where healthcare is not confined
    to physical boundaries. <br /> Our mission is to empower patients and doctors
    to connect effortlessly through cutting-edge technology, <br /> bringing
    personalized medical care into the digital age.

        </p>
      </motion.div>

      <motion.div
        style={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <motion.section style={styles.section} variants={itemVariants}>
          <h2 style={styles.sectionHeading} className='text-pink-500'>Our Mission</h2>
          <p style={styles.text}>
            To connect patients and doctors seamlessly using cutting-edge
            technology. We aim to make healthcare accessible, reliable, and
            personalized.
          </p>
        </motion.section>

        <motion.section style={styles.section} variants={itemVariants}>
          <h2 style={styles.sectionHeading} className='text-pink-500'>What We Offer</h2>
          <ul style={styles.list}>
            <motion.li style={styles.listItem} variants={itemVariants}>
              🌐 <strong>Video Consultations:</strong> Talk to doctors from
              anywhere.
            </motion.li>
            <motion.li style={styles.listItem} variants={itemVariants}>
              🩺 <strong>Doctor Profiles:</strong> Browse specialists and their
              expertise.
            </motion.li>
            <motion.li style={styles.listItem} variants={itemVariants}>
              🤖 <strong>AI Assistance:</strong> Disease predictions and
              medication suggestions.
            </motion.li>
            <motion.li style={styles.listItem} variants={itemVariants}>
              ⏰ <strong>24/7 Support:</strong> Healthcare at your fingertips,
              anytime.
            </motion.li>
            <motion.li style={styles.listItem} variants={itemVariants}>
            💬 <strong>Real-Time Chat:</strong> Stay connected with your doctor via instant
            messaging for quick clarifications and follow-ups.
              anytime.
            </motion.li>
          </ul>
        </motion.section>

        <motion.section style={styles.section} variants={itemVariants}>
          <h2 style={styles.sectionHeading} className='text-pink-500'>Why Choose Us?</h2>
          <p style={styles.text}>
            Combining AI-driven insights with personalized care, we ensure
            you’re always a step ahead in managing your health.
          </p>
        </motion.section>
      </motion.div>
    </div>
    </>
  );
};

const styles = {
  container: {
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f3f4f6",
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(270deg, #4f46e5, #2563eb, #60a5fa)",
    backgroundSize: "400% 400%",
    zIndex: -1,
  },
  banner: {
    textAlign: "center",
    padding: "60px 20px",
    color: "black",
    borderRadius: "12px",
    marginBottom: "40px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "20px",
  },
  content: {
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  section: {
    marginBottom: "30px",
  },
  sectionHeading: {
    fontSize: "28px",
    // color: "pink",
    marginBottom: "10px",
  },
  text: {
    fontSize: "18px",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    marginBottom: "10px",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
  },
};

export default AboutUs

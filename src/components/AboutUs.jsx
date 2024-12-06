import Logo from './images/logo.png';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { BorderBeam } from './magicui/border-beam';

const AboutUs = () => {
    const navigate=useNavigate()
    const home_back=()=>{
        navigate('/back_home')
    }

    const doc_login = () => {
        navigate("/doctor-login")
    }

    const patient_login = () => {
        navigate("/patient-login")
    }

    const loginOptions=()=>{
        document.querySelector(".blur").style.display = "block"
        document.querySelector("#doctorOrpatient").style.display= "block"
    }

    const crossSvg=()=>{
        document.querySelector(".blur").style.display = "none"
        document.querySelector("#doctorOrpatient").style.display= "none"
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

  return (
    <>


    <div style={styles.container}>
    <div className="doctorOrpatient">

<div id='doctorOrpatient' className='relative rounded-lg'>
    <BorderBeam size={250} duration={5} />

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6" onClick={crossSvg} style={{ marginLeft: 420,marginTop:5,cursor:'pointer'}}>
<path d="M6 18 18 6M6 6l12 12" />
</svg>
    <p className='text-center text-4xl font-semibold mt-2'>Sign In</p>
    <button type="button" id='doc-btn' className='text-white text-2xl bg-pink-600 py-3 mt-5' onClick={doc_login}>Doctor</button>
    <button type="button" id='pat-btn' className='text-pink-600 border border-pink-700 text-2xl bg-white py-3 mt-2' onClick={patient_login}>Patient</button>
</div>
</div>

<div className="blur">

</div>
    <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                    <img src={Logo} alt="" className='logo' />
                    <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                    <div>
                        <a href="#" className="text-white ml-20 text-lg" onClick={home_back}>Home</a>
                        <a href="#" className="text-white ml-10 text-lg" onClick={loginOptions}>Doctors Profiles</a>
                    </div>

                    <div className="search ml-20">
                        <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search' />
                    </div>

                    <div className="flex ml-auto space-x-10">
                        <div className="login"><button className="btn-reg bg-transparent border border-black-400 text-white px-2 py-2 rounded" onClick={patient_login}>LogIn</button></div>
                        <div className="join"><button className="btn-join bg-transparent border border-pink-500 text-pink-200 mr-20 px-2 py-2 rounded" onClick={doc_login}>Register as Doctor</button></div>
                    </div>
                </nav>
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
        <h1 style={styles.heading} className='text-blue-500'>About Us</h1>
        <p style={styles.subHeading} className='text-black ml-12'>
        At Medi Assist, we believe in a future where healthcare is not confined
    to physical boundaries. <br /> Our mission is to empower patients and doctors
    to connect effortlessly through cutting-edge technology, <br /> bringing
    personalized medical care into the digital age.

        </p>
      </motion.div>

      {/* Content Section */}
      <motion.div
        style={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mission */}
        <motion.section style={styles.section} variants={itemVariants}>
          <h2 style={styles.sectionHeading}>Our Mission</h2>
          <p style={styles.text}>
            To connect patients and doctors seamlessly using cutting-edge
            technology. We aim to make healthcare accessible, reliable, and
            personalized.
          </p>
        </motion.section>

        {/* What We Offer */}
        <motion.section style={styles.section} variants={itemVariants}>
          <h2 style={styles.sectionHeading}>What We Offer</h2>
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

        {/* Why Choose Us */}
        <motion.section style={styles.section} variants={itemVariants}>
          <h2 style={styles.sectionHeading}>Why Choose Us?</h2>
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
    fontFamily: "Arial, sans-serif",
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
    color: "#2563eb",
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

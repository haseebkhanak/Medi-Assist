
import Logo from './images/logo.png';
import Doctor from './images/doctor.png';
import Blog from './images/blog.jpeg';
import Image_slider from './slider';
import { useNavigate } from 'react-router-dom';
import { BorderBeam } from './magicui/border-beam';

function Home() {

    const navigate = useNavigate()
    const doc_login = () => {
        navigate("/doctor-login")
    }

    const about_us = () => {
        navigate("/about-us")
    }

    const navigatePatientLogin = useNavigate()
    const patient_login = () => {
        navigatePatientLogin("/patient-login")
    }

    const loginOptions=()=>{
        document.querySelector(".blur").style.display = "block"
        document.querySelector("#doctorOrpatient").style.display= "block"
    }

    const crossSvg=()=>{
        document.querySelector(".blur").style.display = "none"
        document.querySelector("#doctorOrpatient").style.display= "none"
    }

    return (
        <>
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

            <div className="homeBody">
                <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
                    <img src={Logo} alt="" className='logo' />
                    <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                    <div>
                        <button className="text-white ml-20 text-lg" onClick={loginOptions}>About Us</button>
                        <button className="text-white ml-10 text-lg" onClick={loginOptions}>Doctors Profiles</button>
                    </div>

                    <div className="search ml-20">
                        <input type="text" placeholder='Search...' className='shadow py-1 px-4 rounded focus:outline-none' id='search' />
                    </div>

                    <div className="flex ml-auto space-x-10">
                        <div className="login"><button className="btn-reg bg-transparent border border-black-400 text-white px-2 py-2 rounded" onClick={loginOptions}>LogIn</button></div>
                        <div className="join"><button className="btn-join bg-transparent border border-pink-500 text-pink-200 mr-20 px-2 py-2 rounded" onClick={doc_login}>Register as Doctor</button></div>
                    </div>
                </nav>

                <br /> <br /> <br />
                <div className="doctor_img shadow-2xl mt-10 flex bg-pink-100">
                    <img src={Doctor} alt="no" />
                    <h2 className='font-black text-blue-100 ml-12 mt-10'>Welcome To <span className='text-red-600'>Medi Assist</span> <br />
                        <span className='text_two'>A Platform where Patients can Connect with Doctors for <span className='text-black'><i>Real Time Consultation</i></span></span></h2>
                </div>

                <br /><br />

                <Image_slider />

                {/* <div className="images flex">
        <div className="blog shadow-2xl">
            <img src={Blog} alt="no"/>
            <h1 className='font-black text-center mt-5'>Blogs</h1 >
            <h3 className='text-center'>Read Blogs related to diet plans and health </h3 >
        </div>
        </div> */}
            </div>
        </>
    )
}

export default Home
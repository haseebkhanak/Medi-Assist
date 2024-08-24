import React from 'react';
import Logo from './images/logo.png';
import Image_slider_login from './doc_login_Slider';
import { useNavigate } from 'react-router-dom';

export default function Patient_login() {

    const navigateBack=useNavigate()
    const home_back=()=>{
        navigateBack('/back_home')
    }

    const navigateReg=useNavigate()
    const regDoctor=()=>{
        navigateReg("/doctor-reg")
    }

    return (
        <>
            <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-xl">
                <img src={Logo} alt="Logo" className='logo' />
                <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                <div className="flex ml-auto">
                        <a href="#" onClick={home_back} className="text-white text-lg home">Home</a>
                        {/* <a href="#" className="text-white text-lg home">Home</a> */}

                        <button className="registration bg-transparent border border-black-400 text-white px-2 py-2 hover:bg-pink-500 hover:text-black hover:border-black-500 rounded mr-20" onClick={regDoctor}>
                            Register as a Doctor
                        </button>

                </div>
            </nav>

 <br /> <br /> <br /> <br />

                <div>
                    <Image_slider_login/>
                </div>

        </>
    );
}


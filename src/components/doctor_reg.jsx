import React from "react";
import Logo from './images/logo.png';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Doctor_registration() {

    const navigateBack=useNavigate()
    const home_back=()=>{
        navigateBack('/back_home')
    }

    const navigateLogin=useNavigate()
    const doc_login=()=>{
        navigateLogin("/doctor-login")
    }
    
    useEffect(() => {
        document.body.style.backgroundColor = 'white'
    }, []);

    const [profile, setProfile] = useState("")
    const [profileError, setProfileError] = useState("")
    const [fullName, setName] = useState("")
    const [nameError, setNameError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPassword, setconfirmPass] = useState("")
    const [confirmpassError, setconfirmPassError] = useState("")
    const [edu, setEdu] = useState("")
    const [eduError, setEduError] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [specializationError, setSpecializationError] = useState("")
    const [experience, setExp] = useState("")
    const [expError, setExpError] = useState("")
    const [message, setMessage] = useState("")

    const specializationNames=["Dermatologist","Dentist","Eye Specialist"]
    useEffect(()=>{
        let specs=document.querySelector("#specialization")
        while (specs.firstChild) {
            specs.removeChild(specs.firstChild);
        }
        
        for (const key of specializationNames) {
            const option=document.createElement("option")
            option.value=key
            specs.appendChild(option)
        }

    },[])

    const handleProfile = (event) => {
        const file = event.target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (validTypes.includes(file.type)) {
            setProfile(file)
            setProfileError("");
        }
        else {
            setProfileError("Please select a valid image file (jpg, jpeg, or png)");
        }
    }

    const handleName = (event) => {
        setName(event.target.value)

        if (fullName != "") {
            setNameError("")
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)

        if (password !== "") {
            setPasswordError("")
        }
    }

    const handleconfirmPass = (event) => {
        setconfirmPass(event.target.value)

        if (password !== "") {
            setconfirmPassError("")
        }

    }

    const handleEdu = (event) => {
        setEdu(event.target.value)

        if (edu !== "") {
            setEduError("")
        }
    }

    const handleSpecialization = (event) => {
        setSpecialization(event.target.value)

        if (specialization !== "") {
            setSpecializationError("")
        }

    }

    const handleExperience = (event) => {
        setExp(event.target.value)

        if (experience !== "") {
            setExpError("")
        }
    }

    let charname = /^[a-zA-Z\s]+$/
    let charpassword = /[@#!$%&]/

    const formSubmit = async (event) => {
        
        event.preventDefault()

        if (profile === "") {
            setProfileError("*Upload your Image")
            return
        }

        if (profile !== "") {
            setProfileError("")
        }

        if (fullName === "") {
            setNameError("*Name Field is required")
            return
        }

        if (!charname.test(fullName)) {
            setNameError("*Name format is Invalid")
            return
        }

        if (fullName.length < 6) {
            setNameError("*Write your Full Name")
            return
        }

        if (password === "") {
            setPasswordError("*Password is required")
            return
        }


        if (password.length < 8) {
            setPasswordError("*Password length atleast 8 characters")
            return
        }

        if (!charpassword.test(password)) {
            setPasswordError("*Password should contain characters(@,#,!,$,%,&)")
            return
        }

        if (confirmPassword === "") {
            setconfirmPassError("*Retype to confirm password")
            return
        }

        if (password !== confirmPassword) {
            setconfirmPassError("*Password are not same")
            return
        }

        if (edu === "") {
            setEduError("*Enter your educational detail")
            return
        }

        if (specialization === "") {
            setSpecializationError("*Enter specialization")
            return
        }

        if(!specializationNames.includes(specialization))
        {
            setSpecializationError("*Enter valid field")
            return
        }

        if (specialization !== "") {
            setSpecializationError("")
        }

        if (experience === "") {
            setExpError("*Enter experience")

        }


        const formData = new FormData();
        formData.append('profile', profile);
        formData.append('fullName', fullName);
        formData.append('email', email)
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('edu', edu);
        formData.append('specialization', specialization);
        formData.append('experience', experience);

        try {
            const res = await fetch('http://localhost:2000/reg', {
                method: 'POST',
                body: (formData)
            })
        
            const result = await res.json();
            setMessage(result);
            document.querySelector('.alertReg').style.display="block"

        } catch (error) {
            console.error("Error submitting form:", error);
        }

    }

    const reset = () => {
        if (fullName !== "" || email!=="" || password !== "" || confirmPassword !== "" || edu !== "" || specialization !== "" || experience !== "") {
            setName('')
            setEmail('')
            setPassword('')
            setconfirmPass('')
            setEdu('')
            setSpecialization('')
            setExp('')
        }
    }

    const btn = () => {
        document.querySelector(".alertReg").style.display = "none"
    }

    const checkpass = () => {
        let x = document.querySelector('#password')
        if (x.type === "password") {
            document.querySelector('#password').type = "text"
        }

        else {
            document.querySelector('#password').type = "password"
        }
    }

    const checkConfirmpass = () => {
        let y = document.querySelector('#confirm_password')
        if (y.type === "password") {
            document.querySelector('#confirm_password').type = "text"
        }

        else {
            document.querySelector('#confirm_password').type = "password"
        }
    }
    return (
        <>

{message && (
                <div className={`alertReg ${message.type==="success" ? 'bg-green-100 border border-green-700' : 'bg-pink-100 border border-red-500'}`}>
                    <p className={`${message.type==="success" ? 'text-2xl text-center text-green-800' : 'text-2xl text-center text-red-600'}`}>{message.message}</p>
                    <div className="flex justify-end">

                        {message.type==="success" ? <button type="button" className="CancelBtn px-2 py-1 mr-5 mt-4 mb-2 bg-green-400 border border-green-600 text-white rounded-lg  hover:bg-transparent hover:text-black hover:border-red-green" onClick={doc_login}>Ok</button>
                        :<button type="button" className="CancelBtn px-2 py-1 mr-5 mt-4 mb-2 text-white bg-red-400 border border-red-600 rounded-lg hover:bg-transparent hover:text-black hover:border-red-500" onClick={btn}>Cancel</button>}
                    </div>
                </div>

            )}

            <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-xl">
                <img src={Logo} alt="Logo" className='logo' />
                <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

                <div className="flex ml-auto">
                    <a href="#" className="btn-home text-white text-lg home hover:text-pink-400" onClick={home_back}>Home</a>
                    <button type="button" className="btn-logIn bg-transparent border border-pink-400 text-pink-200 px-2 py-1 mr-20 rounded" onClick={doc_login}>Log In</button>
                </div>
            </nav> 
            <br /> <br /> <br /> <br />

            <br />
            <div className="Register shadow-2xl">
                <div className="Register-box">

                    <p className="text-center text-3xl text-white">Register as a Doctor</p>
                    <p className="text-xl text-center italic text-white">Field with <span className="text-red-500">*</span> are required</p>
                </div>

                <br />

                <div className="form">
                    <form className="ml-10" onSubmit={formSubmit}>
                        <fieldset>
                            <legend className="text-xl">Personal Information</legend>
                            <label>Upload a profile <span className="text-red-500">*</span>
                                <input type="file" name="profile" id="profile" className="block mt-3" onChange={handleProfile} />
                            </label>

                            <div className="profilerror">
                                <p className="text-red-600">{profileError}</p>
                            </div> <br />

                            <div className="flex">
                                <div className="w-1/2">
                                    <label>Full Name <span className="text-red-500">*</span>
                                        <input type="text" name="fullname" id="fullname" className="block py-1" placeholder="Full Name..." value={fullName} onChange={handleName} />
                                    </label>

                                    <div className="nameerror">
                                        <p className="text-red-600">{nameError}</p>
                                    </div>
                                </div>

                                <div className="w-1/2 ml-10">
                                    <label>Email <span className="text-red-500">*</span>
                                        <input type="email" name="email" id="email" className="block py-1" placeholder="xyz@xyz.com" required value={email} onChange={handleEmail} />
                                    </label>
                                </div>
                            </div>

                            <div className="flex mt-5">

                                <div className="w-1/2">
                                    <label>Password <span className="text-red-500">*</span> <span className="ml-20"><input type="checkbox" onClick={checkpass} className="accent-pink-500" /> Show Password</span>
                                        <input type="password" name="password" id="password" className="block py-1" placeholder="Strong Password..." value={password} onChange={handlePassword} />
                                    </label>

                                    <div className="passworderror">
                                        <p className="text-red-600">{passwordError}</p>
                                    </div> </div> <br />

                                <div className="w-1/2 ml-10">
                                    <label>Confirm Password <span className="text-red-500">*</span> <span className="ml-5"><input type="checkbox" onClick={checkConfirmpass} className="accent-pink-500" /> Show Password</span>
                                        <input type="password" name="password" id="confirm_password" className="block py-1" placeholder="Retype Password..." value={confirmPassword} onChange={handleconfirmPass} />
                                    </label>

                                    <div className="confirmpassworderror">
                                        <p className="text-red-600">{confirmpassError}</p>
                                    </div>
                                </div>
                            </div>

                        </fieldset> <br />

                        <fieldset>
                            <legend className="text-xl">Educational Background</legend>
                            <label>Education <span className="text-red-500">*</span>
                                <input type="text" name="edu" id="edu" className="block py-1 mt-3" placeholder="MBBS,FCPS(Dermatology),MCPS(Dermatology)" value={edu} onChange={handleEdu} />
                            </label>

                            <div className="eduerror">
                                <p className="text-red-600">{eduError}</p>
                            </div>

                        </fieldset> <br />

                        <fieldset>
                            <legend className="text-xl">Profession</legend>

                            <div className="flex">
                                <div className="w-1/2">
                                    <label>Specialization <span className="text-red-500">*</span>
                                        <input type="text" list="specialization" id="specialize" className="block mt-3 py-1" placeholder="double click to see list" value={specialization} onChange={handleSpecialization} />
                                        <datalist id="specialization">

                                        </datalist>
                                    </label>

                                    <div className="specializationerror">
                                        <p className="text-red-600">{specializationError}</p>
                                    </div>
                                </div>

                                <div className="w-1/2">
                                    <label>Experience <span className="text-red-500">*</span>
                                        <input type="text" name="exp" id="exp" className="block py-1 mt-3" placeholder="2 years" value={experience} onChange={handleExperience} />
                                    </label>

                                    <div className="experror">
                                        <p className="text-red-600">{expError}</p>
                                    </div>
                                </div>
                            </div>

                        </fieldset> <br />

                        <div className="form_buttons flex">
                            <button type="submit" className="bg-black px-6 py-2 rounded text-white text-xl hover:bg-transparent border hover:border-pink-800 hover:text-black">Save</button>
                            <button type="reset" className="ml-5 bg-pink-500 px-6 py-2 rounded text-white text-xl hover:bg-transparent border hover:border-pink-800 hover:text-black" onClick={reset}>Reset</button>
                        </div> <br />

                    </form>
                </div>

            </div><br />

        </>
    )
}

const DoctorReg=require('./DoctorReg_Sch.cjs')
const DoctorLogin=require('./DoctorLogin_Sch.cjs')
const dbconnection=require('./dbConn.cjs')
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const session=require('express-session')

const app = express();
const upload = multer();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())

app.use(session({
    secret: '03135211029',
    // resave: false,
    // saveUninitialized: true,
    // cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.post('/reg', upload.single('profile'), async(req, res) => {
    const { fullName, email, password, confirmPassword, edu, specialization, experience } = req.body;
    const profile = req.file.buffer;
    
    try {
        
            const RegEmail=await DoctorReg.findOne({email:email})
            const RegPassword=await DoctorReg.findOne({password:password})

            if(RegEmail){
                res.status(401).json({ message: 'Email already registered!', type:'error' });
                return
            }

            if(RegPassword){
                res.status(401).json({ message: 'Password is already in use!', type:'error' });
                return
            }

            if(!RegEmail || !RegPassword)
            {
                const doctordata={fullName, email, password, confirmPassword, edu, specialization, experience, profile}
                const DoctorRegistration=DoctorReg(doctordata)
                await DoctorRegistration.save()
                console.log("Data inserted")
                res.status(200).json({ message: `Your information has been added successfully!`, type:'success' });
            }

        
    }
    catch (error) {
        console.log(`Data not inserted due to => ${error}`)
    }

});

app.post('/login', async(req,res)=>{

    const{loginemail,loginpassword}=req.body

    try {

        const RegAccount=await DoctorReg.findOne({email:loginemail, password:loginpassword})
        if(RegAccount){
            req.session.profileAccount=RegAccount
            req.session.Name=RegAccount.fullName
            req.session.profile=RegAccount.profile.toString('base64')

            const LoginData={loginemail,loginpassword}
            const doctorlogin = DoctorLogin(LoginData)
            await doctorlogin.save()
            res.status(200).json({ message: 'Login successfully',type:"success" })

        }
        
        else{
            res.status(401).json({ message: `Invalid email or password`,type:"error" });
        }
  
    } catch (error) {
        console.log("Error ",error)
    }

})

app.post('/viewprofile', async(req, res) => {
    try {
        if(req.session.Name)
            {
                const profileAccount = req.session.profileAccount;
                const profilePicture = req.session.profile
                res.status(200).json({ showProfile_message: profileAccount,showPicture_message: profilePicture});
                // console.log(profileAccount)

            }
            else{
                console.log("Profile not found")
            }
        }
      catch (error) {
        res.status(401).json({ message: "Profile not found" });
        console.log(error)
    }
})

app.post('/homepage', (req, res) => {
    try {
        if (req.session.Name) {
        {
            res.status(200).json({ message_name: req.session.Name, message_profile: req.session.profile })
        }

        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.post('/logedOut',(req,res)=>{
    // console.log(req.session.Name)
    try {
        if(req.session.Name)
        {
        req.session.Name= null
        req.session.save()
        res.status(200).json({message:"You have logged out"})
        }

        else{
            res.status(401).json({message:"Session can not be destroy"})
        }
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

app.post('/Patient_Login',(req,res)=>{
    console.log(req.body)
    res.send("data received")
})
const port = 2000;

dbconnection().then(app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
}))

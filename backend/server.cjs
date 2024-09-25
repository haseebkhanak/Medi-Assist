const DoctorReg = require('./DoctorReg_Sch.cjs')
const DoctorLogin = require('./DoctorLogin_Sch.cjs')
const PatientReg = require('./PatientReg_Sch.cjs')
const PatientLogin = require('./PatientLogin.cjs')
const Messages=require('./messagesStored.cjs')
const Notification=require('./notificationsStored.cjs')
const dbconnection = require('./dbConn.cjs')
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session')
const socket_io=require('socket.io')
const http=require('http')

const app = express();
const server=http.createServer(app)

const io = socket_io(server, {
    cors: {
      origin: 'http://localhost:5173',
    },
  });

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())

app.use(session({
    secret: '03135211029',
}));

const upload = multer();

app.post('/reg', upload.single('profile'), async (req, res) => {
    const { fullName, email, password, confirmPassword, edu, specialization, experience } = req.body;
    const profile = req.file.buffer;

    try {

        const RegEmail = await DoctorReg.findOne({ email: email })
        const RegPassword = await DoctorReg.findOne({ password: password })

        if (RegEmail) {
            res.status(401).json({ message: 'Email already registered!', type: 'error' });
            return
        }

        if (RegPassword) {
            res.status(401).json({ message: 'Password is already in use!', type: 'error' });
            return
        }

        if (!RegEmail || !RegPassword) {
            const doctordata = { fullName, email, password, confirmPassword, edu, specialization, experience, profile }
            const DoctorRegistration = DoctorReg(doctordata)
            await DoctorRegistration.save()
            console.log("Data inserted")
            res.status(200).json({ message: `Your information has been added successfully!`, type: 'success' });
        }


    }
    catch (error) {
        console.log(`Data not inserted due to => ${error}`)
    }

});

app.post('/login', async (req, res) => {

    const { loginemail, loginpassword } = req.body

    try {

        const RegAccount = await DoctorReg.findOne({ email: loginemail, password: loginpassword })
        if (RegAccount) {
            req.session.profileAccount = RegAccount
            req.session.Name = RegAccount.fullName
            req.session._id = RegAccount._id
            req.session.profile = RegAccount.profile.toString('base64')
            // console.log(RegAccount._id)
            // console.log(RegAccount._id)

            const LoginData = { loginemail, loginpassword }
            const doctorlogin = DoctorLogin(LoginData)
            await doctorlogin.save()
            res.status(200).json({ message: 'Login successfully', type: "success" })

        }

        else {
            res.status(401).json({ message: `Invalid email or password`, type: "error" });
        }

    } catch (error) {
        console.log("Error ", error)
    }

})

app.post('/viewprofile', async (req, res) => {
    try {
        if (req.session.Name) {
            const profileAccount = req.session.profileAccount;
            const profilePicture = req.session.profile
            res.status(200).json({ showProfile_message: profileAccount, showPicture_message: profilePicture });
            // console.log(profileAccount)

        }
        else {
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
                res.status(200).json({ message_name: req.session.Name, message_profile: req.session.profile, message_id: req.session._id})
            }

        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.post('/logedOut', (req, res) => {
    // console.log(req.session.Name)
    try {
        if (req.session.Name) {
            req.session.Name = null
            req.session.save()
            res.status(200).json({ message: "You have logged out" })
        }

        else {
            res.status(401).json({ message: "Session can not be destroy" })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

app.post('/Patient_Login', async (req, res) => {

    const { patientloginemail, patientloginpassword } = req.body
    try {
        const patientInfo = await PatientReg.findOne({ patientemail: patientloginemail, patientpassword: patientloginpassword })
        if (patientInfo) {
            const patientname = patientInfo.patientname
            req.session.patientname = patientname
            req.session.patientId=patientInfo.patientemail
            // console.log(patientId)
            // console.log(patientname)
            const PatientLoginData = { patientloginemail, patientloginpassword }
            const patientData = await PatientLogin(PatientLoginData)
            await patientData.save()
            console.log("Login Successfully")
            res.status(200).send({ message: "Login Successfully", type: "success" })
            // console.log(patientData)
        }

        else {
            console.log("User does not exist")
            res.status(401).send({ message: "User does not exist", type: "notsuccess" })
        }

    } catch (error) {
        console.log(error)
    }

})

app.post('/patienthome', (req, res) => {
    try {
        if (req.session.patientname) {
            {
                res.status(200).json({ message_name: req.session.patientname, message_email: req.session.patientId })
                // console.log(req.session.patientId)
                // console.log(patientInfo._id)
            }

        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.post('/patientlogedOut', (req, res) => {
    try {
        if (req.session.patientname) {
            req.session.patientname = null
            req.session.save()
            res.status(200).json({ message: "You have logged out" })
        }

        else {
            res.status(401).json({ message: "Session can not be destroy" })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

app.post('/patient_signup', async (req, res) => {
    const { patientname, patientemail, patientpassword } = req.body
    try {
        const isEmail = await PatientReg.findOne({ patientemail: patientemail })
        const isPassword = await PatientReg.findOne({ patientpassword: patientpassword })
        if (isEmail) {
            res.status(401).json({ message: "Email is already present", type: "notsuccess" })
        }

        else if (isPassword) {
            res.status(401).json({ message: "Password is already present", type: "notsuccess" })
        }

        else {
            const data = { patientname, patientemail, patientpassword }
            const patientdata = await PatientReg(data)
            await patientdata.save()
            if (patientdata) {
                console.log("data inserted")
                console.log(req.body)
                res.status(200).json({ message: "Sign Up Succesfull", type: "success" })
            }
        }

    } catch (error) {
        res.status(501).json({ message: "Server Error ", error })
        console.log(error)
    }
})

app.post('/dermprofiles', async(req,res)=>{
    try {
        const doctorDetail= await DoctorReg.find({specialization:"Dermatologist"})
        const doctorDetailswithPictures=doctorDetail.map((doctorDetail)=>{
            return{
                ...doctorDetail.toObject(),
                profile:doctorDetail.profile.toString('base64')
            }
        })
        res.status(200).json({doctorProfileMessage:doctorDetailswithPictures})
        console.log(doctorDetailswithPictures)
        
    } catch (error) {
        console.log(error)
    }
})

// const users = {};
// io.on('connection', (socket) => {
//     console.log(`User connected with socket ID: ${socket.id}`);

//     socket.on('register', async (username, userId) => {
//         socket.username = username;
//         socket.userId = userId;
//         users[userId] = socket.id;

//         console.log(`User ${username} with ID ${userId} registered with socket ID ${socket.id}`);

//         try {
//             const undeliveredMessages = await Messages.find({ toUserId: userId, fromUserId:socket.userId, delivered: false});

//             if (undeliveredMessages) {
//                 undeliveredMessages.forEach((msg) => {
//                     socket.emit('privateMessageToClient', {
//                         from: { userId: msg.fromUserId },
//                         message: msg.message
//                     });

//                     msg.delivered = true;
//                     msg.save();
//                 });

//                 console.log(`Delivered messages to ${username}`);
//             } else {
//                 console.log("No undelivered messages for user", userId);
//             }
//         } catch (error) {
//             console.log("Error fetching undelivered messages:", error);
//         }

//         try {

//                 const undeliveredNotifications = await Notification.find({ toUserId: userId, delivered: false });
    
//                 if (undeliveredNotifications) {
//                     undeliveredNotifications.forEach((notification) => {
//                         socket.emit('notification', { patientdetails: notification.patientdetails });
    
//                         notification.delivered = true;
//                         notification.save();
//                     });
    
//                     console.log(`Delivered undelivered notifications to Doctor ${username}`);
//                 }
//         } catch (error) {
//             console.log("Error fetching undelivered notifcations:", error);
//         }
//     });


//     socket.on('message', async (message) => {
    
//         console.log(`Message received from ${socket.username} (ID: ${socket.userId}): ${message}`);
//         io.emit('messageToClient', { from: socket.username, message });
//         if (message) {
//             try {
//                 const patientRegData = await PatientReg.findOne({ patientname: socket.username, patientemail: socket.userId });

//                 if (patientRegData) {
//                     const newNotification = new Notification({
//                         fromUserId: socket.userId,
//                         // toUserId: toUserId,
//                         patientdetails: patientRegData,
//                         delivered: false 
//                     });
//                     await newNotification.save();
//                     console.log(`User is offline, message stored in the database`);

//                         io.emit('notification', {
//                             patientdetails: patientRegData
//                         });
//                         console.log("Patient details sent to the doctor as a notification", patientRegData);
                 
//                 } else {
//                     console.log("No patient details found in the database");
//                 }
//             } catch (error) {
//                 console.log("Error fetching patient details:", error);
//             }
//         }
//     });

//     socket.on('privateMessage', async ({ toUserId, message }) => {
//         const recipientSocketId = users[toUserId];

//         const newMessage = new Messages({
//             fromUserId: socket.userId,
//             toUserId: toUserId,
//             message: message,
//             delivered: recipientSocketId ? true : false  
//         });
//         await newMessage.save();

//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('privateMessageToClient', {
//                 from: { userId: socket.userId, username: socket.username },
//                 message: message
//             });
//             console.log(`Private message sent from ${socket.userId} to userId: ${toUserId}`);
//         } else {
//             console.log(`User ${toUserId} is offline, message stored in the database`);
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log(`User with socket ID ${socket.id} disconnected`);
//     });
// });
// const users = {};

// io.on('connection', (socket) => {
//     console.log(`User connected with socket ID: ${socket.id}`);

//     // Register event to store users
//     socket.on('register', async (username, userId) => {
//         socket.username = username;
//         socket.userId = userId;
//         users[userId] = socket.id;  // Register the user with their socket ID

//         console.log(`User ${username} with ID ${userId} registered with socket ID ${socket.id}`);

//         // Fetch and deliver any undelivered messages
//         try {
//             const undeliveredMessages = await Messages.find({ toUserId: userId, delivered: false });
//             if (undeliveredMessages && undeliveredMessages.length > 0) {
//                 undeliveredMessages.forEach((msg) => {
//                     socket.emit('privateMessageToClient', {
//                         from: { userId: msg.fromUserId },
//                         message: msg.message
//                     });
//                     msg.delivered = true;
//                     msg.save();  // Mark the message as delivered
//                 });
//                 console.log(`Delivered ${undeliveredMessages.length} undelivered messages to ${username}`);
//             }
//         } catch (error) {
//             console.log("Error fetching undelivered messages:", error);
//         }

//         // Fetch and deliver any undelivered notifications (for doctors)
//         try {
//             const undeliveredNotifications = await Notification.find({ toUserId: userId, delivered: false });
//             if (undeliveredNotifications && undeliveredNotifications.length > 0) {
//                 undeliveredNotifications.forEach((notification) => {
//                     socket.emit('notification', { patientdetails: notification.patientdetails });
//                     notification.delivered = true;
//                     notification.save();  // Mark notification as delivered
//                 });
//                 console.log(`Delivered ${undeliveredNotifications.length} undelivered notifications to ${username}`);
//             }
//         } catch (error) {
//             console.log("Error fetching undelivered notifications:", error);
//         }
//     });

//     // Handle incoming messages and store notifications for offline doctors
//     socket.on('message', async (message) => {
//         console.log(`Message received from ${socket.username} (ID: ${socket.userId}): ${message}`);
//         io.emit('messageToClient', { from: socket.username, message });

//         // if (message) {
//         //     try {
//         //         const patientRegData = await PatientReg.findOne({ patientname: socket.username, patientemail: socket.userId });
//         //         if (patientRegData) {
//         //             const doctorId = 'DOCTOR_USER_ID';  // Replace this with the correct doctor ID logic

//         //             if (users[doctorId]) {
//         //                 // Doctor is online, send notification directly
//         //                 io.to(users[doctorId]).emit('notification', { patientdetails: patientRegData });
//         //                 console.log("Patient details sent to the doctor as a notification", patientRegData);
//         //             } else {
//         //                 // Doctor is offline, store the notification
//         //                 const newNotification = new Notification({
//         //                     fromUserId: socket.userId,
//         //                     toUserId: doctorId,
//         //                     patientdetails: patientRegData,
//         //                     delivered: false
//         //                 });
//         //                 await newNotification.save();
//         //                 console.log("Doctor is offline. Stored notification in the database.");
//         //             }
//         //         } else {
//         //             console.log("No patient details found in the database");
//         //         }
//         //     } catch (error) {
//         //         console.log("Error fetching patient details:", error);
//         //     }
//         // }
//     });

//     // Handle private messages between users
//     socket.on('privateMessage', async ({ toUserId, message }) => {
//         const recipientSocketId = users[toUserId];

//         const newMessage = new Messages({
//             fromUserId: socket.userId,
//             toUserId: toUserId,
//             message: message,
//             delivered: recipientSocketId ? true : false
//         });
//         await newMessage.save();
//         try {
//             const patientRegData = await PatientReg.findOne({ patientname: socket.username, patientemail: socket.userId });
//             if (patientRegData) {
//                 const doctorId = toUserId;  // Replace this with the correct doctor ID logic

//                 if (users[doctorId]) {
//                     // Doctor is online, send notification directly
//                     io.to(users[doctorId]).emit('notification', { patientdetails: patientRegData });
//                     console.log("Patient details sent to the doctor as a notification", patientRegData);
//                 } else {
//                     // Doctor is offline, store the notification
//                     const newNotification = new Notification({
//                         fromUserId: socket.userId,
//                         toUserId: doctorId,
//                         patientdetails: patientRegData,
//                         delivered: false
//                     });
//                     await newNotification.save();
//                     console.log("Doctor is offline. Stored notification in the database.");
//                 }
//             } else {
//                 console.log("No patient details found in the database");
//             }
//         } catch (error) {
//             console.log("Error fetching patient details:", error);
//         }
//         if (recipientSocketId) {
//             io.to(recipientSocketId).emit('privateMessageToClient', {
//                 from: { userId: socket.userId, username: socket.username },
//                 message: message
//             });
//             console.log(`Private message sent from ${socket.userId} to userId: ${toUserId}`);
//         } else {
//             console.log(`User ${toUserId} is offline, message stored in the database`);
//         }
//     });

//     // Handle user disconnect
//     socket.on('disconnect', () => {
//         console.log(`User with socket ID ${socket.id} disconnected`);
//         delete users[socket.userId];  // Remove the user from the online users list
//     });
// });
const users = {};

io.on('connection', (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    // Register event to store users
    socket.on('register', async (username, userId) => {
        socket.username = username;
        socket.userId = userId;
        users[userId] = socket.id;  // Register the user with their socket ID

        console.log(`User ${username} with ID ${userId} registered with socket ID ${socket.id}`);
        console.log(`Current users online: `, users);

        // Fetch and deliver any undelivered notifications (for doctors)
        try {
            const undeliveredNotifications = await Notification.find({ toUserId: userId, delivered: false });
            if (undeliveredNotifications && undeliveredNotifications.length > 0) {
                undeliveredNotifications.forEach(async (notification) => {
                    socket.emit('notification', { patientdetails: notification.patientdetails });
                    console.log(`Notification emitted to doctor: ${userId}`, notification.patientdetails);

                    // Mark notification as delivered
                    notification.delivered = true;
                    await notification.save();  // Ensure save is awaited
                    console.log(`Notification marked as delivered for ${userId}`);
                });
                console.log(`Delivered ${undeliveredNotifications.length} undelivered notifications to ${username}`);
            } else {
                console.log("No undelivered notifications found for", userId);
            }
        } catch (error) {
            console.log("Error fetching undelivered notifications:", error);
        }
    });

    socket.on('privateMessage', async ({ toUserId, message }) => {
        const recipientSocketId = users[toUserId];
    
        const newMessage = new Messages({
            fromUserId: socket.userId,
            toUserId: toUserId,
            message: message,
            delivered: recipientSocketId ? true : false
        });
        await newMessage.save();
    
        // Fetch patient details
        try {
            const patientRegData = await PatientReg.findOne({ patientname: socket.username, patientemail: socket.userId });
            if (patientRegData) {
                const doctorId = toUserId;  // Assuming toUserId is the doctor's ID
    
                if (users[doctorId]) {
                    // Doctor is online, send notification directly
                    io.to(users[doctorId]).emit('notification', { patientdetails: patientRegData });
                    console.log("Patient details sent to the doctor as a notification", patientRegData);
                } else {
                    // Doctor is offline, store the notification in the database
                    const newNotification = new Notification({
                        fromUserId: socket.userId,
                        toUserId: doctorId,
                        patientdetails: patientRegData,
                        delivered: false
                    });
                    await newNotification.save();
                    console.log("Doctor is offline. Stored notification in the database.");
                }
            } else {
                console.log("No patient details found in the database");
            }
        } catch (error) {
            console.log("Error fetching patient details:", error);
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log(`User with socket ID ${socket.id} disconnected`);
        delete users[socket.userId];  // Remove the user from the online users list
        console.log(`Current users online after disconnect: `, users);
    });
});




    server.listen(3000,()=>{
        console.log("Server is listening")
    })

const port = 2000;

dbconnection().then(app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
}))

const mongoose= require("mongoose")

const LogSch = new mongoose.Schema({
    loginemail:{
        type:String,
        required:true
    },

    loginpassword:{
        type:String,
        required:true
    },

},{ timestamps: true })

module.exports= mongoose.model("DoctorLogin",LogSch)
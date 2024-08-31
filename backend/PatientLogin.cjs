const mongoose=require('mongoose')

const patientLoginSchema= new mongoose.Schema({
    patientloginemail:{
        type:String,
        required:true
    },

    patientloginpassword:{
        type:String,
        required:true
    }
},{timestamps: true})

module.exports=mongoose.model('PatientLogin',patientLoginSchema)
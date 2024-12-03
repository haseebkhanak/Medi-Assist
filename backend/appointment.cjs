const mongoose=require('mongoose')

const appointmentSchema= new mongoose.Schema({
    doctorName:{
        type:String,
        required:true
    },

    doctorUniqueId:{
        type:String,
        required:true
    },

    patientName:{
        type:String,
        required:true
    },

    patientUniqueId:{
        type:String,
        required:true
    },

    appointmentDate:{
        type:String,
        required:true
    },

    appointmentTime:{
        type:String,
        required:true
    },
},{timestamps: true})

module.exports=mongoose.model('Appointment',appointmentSchema)
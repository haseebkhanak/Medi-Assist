const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    patientname: {
        type: String,
        required: true
    },

    patientemail: {
        type: String,
        required: true
    },

    patientpassword: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('PatientReg', patientSchema)
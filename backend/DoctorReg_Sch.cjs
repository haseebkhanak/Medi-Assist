const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    // unique: true
  },
  password: {
    type: String,
    required: true
  },
  cityName: {
    type: String,
    required: true
  },
  edu: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  profile: {
    type: Buffer,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('DoctorReg', doctorSchema);

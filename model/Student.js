const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false, // Changed to false
    },
    email: {
        type: String,
        required: false, // Changed to false
        unique: true,
    },
    address: {
        type: String,
        required: false, // Changed to false
    },
    enrollmentNo: {
        type: String,
        required: false, // Changed to false
    },
    school: {
        type: String,
        required: false, // Changed to false
    },
    contact: {
        type: String,
        required: false, // Changed to false
    },
    subject: {
        type: String,
        required: false, // Changed to false
    },
    fathername: {
        type: String,
        required: false, // Changed to false
    },
    mothername: {
        type: String,
        required: false, // Changed to false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Adjust the options as needed
        required: false, // Changed to false
    },
    city: {
        type: String,
        required: false, // Changed to false
    },
    state: {
        type: String,
        required: false, // Changed to false
    },
    nationality: {
        type: String,
        required: false, // Changed to false
    },
    cast: {
        type: String,
        required: false, // Changed to false
    },
    adharnumber: {
        type: String,
        required: false, // Changed to false
    },
    anyDiseases: {
        type: [String], // Array of strings
        required: false, // Changed to false
    },
    section: {
        type: String,
        required: false, // Changed to false
    },
    registrationDate: {
        type: Date,
        required: false, // Changed to false
    },
    exitDate: {
        type: Date,
        required: false, // Changed to false
    },
    dob: {
        type: Date, // Consider changing to Date if it represents a date of birth
        required: false, // Changed to false
    },
    id: {
        type: String,
        required: false, // Changed to false
        unique: true,
    },
});

// Create a model from the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

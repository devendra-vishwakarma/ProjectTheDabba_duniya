const Student = require("../model/Student");
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const axios = require("axios");

const exportToExcel = async (req, res) => {
    try {
        const apiUrl = 'https://66e7e954b17821a9d9da7f5e.mockapi.io/userClass/studentData';
        const response = await axios.get(apiUrl);
        const studentdata = response.data;

        // Handle duplicates
        const existingStudents = await Student.find({ email: { $in: studentdata.map(student => student.email) } });
        const newStudents = studentdata.filter(student => !existingStudents.some(existing => existing.email === student.email));


        const data = newStudents.map(student => ({
            Name: student.name,
            Email: student.email,
            Address: student.address,
            EnrollmentNo: student.enrollmentNo,
            School: student.school,
            Contact: student.contact,
            Subject: student.subject,
            FatherName: student.fathername,
            MotherName: student.mothername,
            Gender: student.gender,
            City: student.city,
            State: student.state,
            Nationality: student.nationality,
            Cast: student.cast,
            AadharNumber: student.adharnumber,
            AnyDiseases: student.anyDiseases.join(', '),
            Section: student.section,
            RegistrationDate: student.registrationDate,
            ExitDate: student.exitDate,
            DOB: student.dob,
            ID: student.id,
        }));

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');

        const outputPath = path.join(__dirname, 'students.xlsx');
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath); // Delete the existing file
        }
            
        xlsx.writeFile(workbook, outputPath);
        res.download(__dirname + 'students.xlsx', function (error) {
            console.log(error);
          });
    } catch (error) {
        console.error('Error exporting data to Excel:', error);
        res.status(500).json({ error: "Failed to export data to Excel" });
    }
};

module.exports = { exportToExcel };

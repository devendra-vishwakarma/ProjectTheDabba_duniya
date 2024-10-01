const mongoose = require("mongoose")

async function connectionDb() {
    try {
        let connects = await mongoose.connect("mongodb+srv://ds4221732:HHuPElfNAAThAWra@practicein.fa53a.mongodb.net/?retryWrites=true&w=majority&appName=PracticeIN");

        if (!connects) {
            console.log("db not connect");
        } else {
            console.log("data base connected successfully");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connectionDb}
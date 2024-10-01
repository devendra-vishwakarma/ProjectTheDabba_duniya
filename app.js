const bodyParser = require("body-parser");
const express = require("express");
const register = require("./routes/register");
const { connectionDb } = require("./config/dbconfig");
var cors = require('cors')
const bwipjs = require('bwip-js');
require("dotenv").config();
const moment = require("moment")
const cookieParser = require("cookie-parser");
const { pdfConverter } = require("./pdfController/pdfController.js");
connectionDb()
const geolocation = require('geolocation')
const app = express();
app.use(cors())
app.use(cookieParser());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))

app.use("/", register);

app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});

app.post('/api/data', (req, res) => {
    const { name } = req.body;
    // Get the current date set to midnight (start of the previous day)
    const currentDate = moment().subtract(1, 'days').startOf('day');

    // Define a specific time to compare after midnight (e.g., 1:00 AM)
    const compareTime = moment(); // 1:00 AM on the previous day

    // Example: comparing current time to the defined time
    const now = moment(); // Current time

    if (now.isAfter(compareTime)) {
        console.log('Current time is after 1:00 AM yesterday.');
    } else {
        console.log('Current time is before 1:00 AM yesterday.');
    }


    if (name) {
        res.status(201).json({ message: `Hello, ${name}!` });
    } else {
        res.status(400).json({ error: 'Name is required' });
    }
});
app.listen(process.env.PORT, () => {
    console.log(`server started at PORT ${process.env.PORT}`);
});

app.get('/barcode/:text', (req, res) => {
    const text = req.params.text;

    bwipjs.toBuffer({
        bcid: 'code128',       // Barcode type
        text: text,            // Text to encode
        scale: 3,              // Scaling factor
        height: 5,            // Bar height, in millimeters
        includetext: true,     // Show human-readable text
        textxalign: 'center',  // Align text to center
    }, (err, png) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.set('Content-Type', 'image/png');
            res.send(png); // Send the generated PNG image
        }
    });
});

// app.get("/location", async () => {
//     navigator.geolocation.getCurrentPosition(function (err, position) {
//         if (err) throw err
//         console.log(position)
//     })
// })

function isEven(number) {
    if (number < 0) throw new Error("Number must be positive");
    if (typeof number !== "number") throw new Error("Number must be a number");
    return number % 2 === 0;
}
module.exports = { app, isEven };
const { validateJwt } = require("../middleware/authmiddleware");
const router = require("express").Router();
const { dateFormatMethod, dateFormatMethods } = require("../AllDateFormat/allDateFormat");
const { pdfConverter } = require("../pdfController/pdfController");
const { clientUpdate, clinetLogin, clientRegister, allclient } = require("../controller/clientRegister");
const { exportToExcel } = require("../excelFile/excelConvert");
require("dotenv").config();

router.post("/clientregister",clientRegister);

router.post("/clientlogin", validateJwt,clinetLogin);

router.post("/clientUpdate/:id",clientUpdate);

router.get("/allclient",allclient)

router.post("/pdfconvert",pdfConverter);

router.post("/excelconvert",exportToExcel);

// router.get("/clientregisterDate", (req, res) => {

//      const dates = dateFormatMethod(dateFormatMethods.Unix_timestamp);
//      console.log(dates);

//      res.json({ date: dates });

// })

// router.get('/setobjectcookie', (req, res) => {
//      const user = {
//           name: 'John Doe',
//           age: 30,
//           role: 'admin'
//      };

//      // Convert the object to a JSON string and set the cookie
//      res.cookie('userData', JSON.stringify(user), { maxAge: 900000, httpOnly: true });
//      res.send('User object stored in cookie');
// });

// // Get the cookie and parse the object back
// router.get('/getobjectcookie', (req, res) => {
//      const userData = req.cookies['userData'];

//      if (userData) {
//           res.json({
//                message: 'Cookie retrieved',
//                user: user
//           });
//      } else {
//           res.send('No user data found in cookie');
//      }
// });

// router.get('/clearcookie', (req, res) => {
//      res.clearCookie('userData'); // Clear the cookie
//      res.send('Cookie has been cleared');
// });




module.exports = router;
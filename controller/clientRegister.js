const { default: mongoose } = require("mongoose");
const User = require("../model/User_register_Schema");
var CryptoJS = require("crypto-js");
const clientRegister = async (req, res) => {
    try {
         const { name, password, email } = req.body;
         if (!name || !password || !email) {
              return res.status(400).json({ message: "Name, email, and password are required" });
         }

         const existingUser = await User.findOne({ email });
         if (existingUser) {
              return res.status(409).json({ message: "User with this email already exists" });
         }
         let hashText = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
         const newUser = new User({
              name,
              password: hashText,
              email
         });

         const jwtsign = jwt.sign({ name, password, email }, process.env.SECRET_KEY);

         const savedUser = await newUser.save();
         res.cookie('userData', jwtsign);
         return res.status(201).json({ message: "User registered successfully", user: savedUser, jwtsign });
    } catch (error) {
         console.log(error);
    }
}

const clinetLogin = async (req, res) => {
    try {
         const { email, password } = req.body;
         console.log(req);

         // Check if the user exists
         const existingUser = await User.findOne({ email });
         if (!existingUser) {
              return res.status(404).json({ error: "User not found" });
         }

         // Decrypt stored password
         const decryptedPassword = CryptoJS.AES.decrypt(existingUser.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

         console.log(decryptedPassword);

         // Compare passwords
         if (password !== decryptedPassword) {
              return res.status(401).json({ error: "Invalid credentials" });
         }

         return res.status(200).json({ message: "Login successful", user: existingUser });

    } catch (error) {
         console.error("Error during login:", error);
         return res.status(500).json({ error: "Internal server error" });
    }
}

const clientUpdate =  async (req, res) => {
    try {
         const { name, password, address, phoneNumber, email, state, country, postalCode, _id } = req.body;


         if (_id === req.params.id) {
              return res.status(400).json({ message: "ID in the URL does not match ID in the request body" });
         }

         const hashText = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
         const updateUser = {
              name,
              password: hashText,
              address,
              phoneNumber,
              email,
              state,
              country,
              postalCode
         };

         const data = await User.updateOne({ _id: req.params.id }, { $set: updateUser });

         if (data.nModified === 0) {
              return res.status(404).json({ message: "No user found or no changes made" });
         }

         res.status(200).json({ message: "User updated successfully", updatedUser: updateUser });
    } catch (error) {
         console.error(error);
         res.status(500).json({ message: "An error occurred during the update", error: error.message });
    }
}

const allclient = async (req, res) => {
    const data = await User.find();
    console.log(data);

    if (data) {
         return res.status(200).json({ data: data })
    } else {
         return res.status(500).json({ erorr: "here is error" })
    }
}

module.exports = {clientRegister,clinetLogin,clientUpdate,allclient}
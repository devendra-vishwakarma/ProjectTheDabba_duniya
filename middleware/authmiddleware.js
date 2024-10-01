const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateJwt = (req, res, next) => {
    const urlPath = req.url.split("?")[0];
    console.log(`Route hit: ${req.method} ${urlPath}`);

    // Extract the token after "Bearer "
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Ensure authHeader exists

    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(401).json({ error: "Invalid token" });
        }

       
        console.log("Decoded user info:", decoded);

      
        req.user = decoded;

        console.log("User stored in req:", req.user);

        
        next();
    });
};

module.exports = { validateJwt };

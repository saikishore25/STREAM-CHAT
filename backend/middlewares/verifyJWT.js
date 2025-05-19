import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const verifyJWT = async (req, res, next) => {

    const token = req.cookies.authToken; 
    console.log("Verifiying Token: ", token)

    if(!token){

        console.log("Unauthorized, No Token Found")
        return res.status(401).json({ "message": "Unauthorized. No token provided." });
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){

            return res.status(401).json({"message": "Unauthorized Token"})
        }

        const user = await userModel.findById(decoded.userID).select("-password");

        req.user = user; 
        next();
    } 
    
    catch(error){

        console.log("Invalid or expired token.")
        return res.status(401).json({ "message": "Invalid or expired token."});
    }
};

export default verifyJWT;

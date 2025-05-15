import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js";
import generateJWTandSetCookie from "../utils/generateJWT.js";
import { upsertStreamUser } from "../configs/stream.js";

const UserSignup = async(req, res)=>{

    const {fullName, email, password} = req.body;
    
    try{

        if(!fullName || !email || !password){

            console.log("All Fields Are Required to SignUp")
            return res.status(400).json({"message": "All Fields Are Required to SignUp"})
        }

        if(password.length <8){

            console.log("Password Must Be Atleast 8 Characters Long")
            return res.status(400).json({"message":"Password Must Be Atleast 8 Characters Long"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){

            console.log("Invalid Email Format")
            return res.status(400).json({"message":"Invalid Email Format"})
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){

            console.log("User Already Exists With This Email")
            return res.status(400).json({"message":"User Already Exists With This Email"})
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const idx = Math.floor(Math.random()*100) +1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        
        const newUser = new userModel({
            fullName,
            email,
            password: hashedPassword,
            profilePic:randomAvatar
        }); 
        
        await newUser.save();

        try{

            await upsertStreamUser({
    
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            })

            console.log("Stream user Created Sucessfully")
        }

        catch(error){

            console.log("Error Creating Stream User", error)
        }
        const token = await generateJWTandSetCookie(newUser._id, res)

        console.log("User Registered Successfully");
        return res.status(201).json({ "message": "User Registered Successfully", user:newUser });
    }

    catch(error){

        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }
}


const UserLogin = async(req, res)=>{

    const {email, password} = req.body;

    try{

        if(!email || !password){

            console.log("All Fields are Required")
            return res.status(400).json({ "message": "All fields are required" });
        }
      
        const existingUser = await userModel.findOne({ email });
    
        if(!existingUser){

            console.log("Not A Registered User. Please SignUp")
            return res.status(400).json({ "message": "Not A Registered User. Please SignUp"});
        }
      
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    
        if(!isPasswordCorrect){

            console.log("Invalid email or password")
            return res.status(400).json({ "message": "Invalid email or password"});
        }
      
        await generateJWTandSetCookie(existingUser._id, res);
      
        return res.status(200).json({ message: "Login successful", user:existingUser});

    }

    catch(error){

    }
}


const UserLogout = async(req, res)=>{

    try{
        
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
    
        res.status(200).json({ "message": "User logged out successfully" });
    } 
    
    catch(error){

        console.error("Logout Error:", error.message);
        res.status(500).json({ "message": "Server error during logout" });
    }
}

const ProfileSetup = async(req, res)=>{

    const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body;
    try{

        const userID = req.user._id;

        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){

            console.log("All Fields Are Required");
            return res.status(401).json({"message":"All Fields Are Required"})
        }

        const updatedUser = await userModel.findByIdAndUpdate(userID, {

            ...req.body,
            isOnProfileSetup:true

        }, {new:true})

        if(!updatedUser){

            console.log("No User Foud");
            return res.status(404).json({"message":"User Not Found"});

        }

        try{

            await upsertStreamUser({
    
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || ""
            })

            console.log("Stream User Updated on Profile Setup")
        }

        catch(error){

            console.log("Error Updating Stream User", error)
        }
        
        return res.status(200).json({"message":"User Found", user:updatedUser})
    }

    catch(error){

        console.error("Error in Profile Setup", error.message);
        res.status(500).json({ "message": "Server error during profile setup" });

    }


}

export {UserSignup, UserLogin, UserLogout, ProfileSetup}
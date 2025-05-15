import express from "express"
import { UserSearchSource } from "stream-chat";
import userModel from "../models/userModel.js";
import FriendRequestModel from "../models/friendRequestModel.js";

const GetRecommendedUsers = async(req, res)=>{

    try{

        const userID = req.user.id;
        console.log(userID)
        const user = req.user;

        const recommendedUsers = await userModel.find({

            $and: [

                {_id: {$ne:userID}},
                {_id: {$nin: user.friends}},
                {isOnProfileSetup: true}
            ]
        })


        if(!recommendedUsers){

            console.log("No Recommended Users Found")
            return res.status(400).json({"message":"No Recommended Users Found"})
        }

        
        console.log("Recommended Users Found", recommendedUsers)
        return res.status(200).json({"message":"Recommended Users Found", recommendedUsers})
    }
    
    catch(error){

        
        console.log("Error Finding Recommended Users", error)
        return res.status(400).json({"message":"Internal Server Error"})
    }
}

const GetFriends = async(req, res)=>{

    try{

        const userFriends = await userModel.findById(req.user.id)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage LearningLanguage")

        if(!userFriends){

            console.log("There are No Friends, Please Make Friends")
            return res.status(400).json({"message":"There are No Friends, Please Make Friends"})
        }

        console.log("Friends Found")
        return res.status(200).json({"message":"Friends Found", userFriends})

    }
    
    catch(error){

        console.log("Error in Finding Friends", error)
        return res.status(400).json({"message":"Internal Server Error"})
    }
}

const SendFriendRequest = async(req, res)=>{

    try{

        const userID = req.user.id;
        const recipientID = req.params.id;
        console.log("Recipient ID", recipientID)
        
        if(userID == recipientID){

            console.log("Cannot Send Friend Request To Yourself")
            return res.status(400).json({"message":"Cannot Send Friend Request To Yourself"})
        }

        const recipient = await userModel.findById(recipientID)

        if(!recipient){

            console.log("Recipient Not Found")
            return res.status(400).json({"message":"Recipient Not Found"})
        }

        if(recipient.friends.includes(userID)){

            console.log("You Are Already Friends With Each Other")
            return res.status(400).json({"message":"You Are Already Friends With Each Other"})
        }

        const existingRequest = await FriendRequestModel.findOne({

            $or:[

                {sender:userID, recipient: recipientID},
                {sender:recipientID, recipient:userID}
            ]
        })

        if(existingRequest){

            console.log("A Friend Request Already Exists Betweem The Two Users")
            return res.status(400).json({"message":"A Friend Request Already Exists Betweem The Two Users"})
        }

        const friendRequest = await FriendRequestModel.create({

            sender:userID,
            recipient:recipientID
        })

        console.log("Friend Request Created Sucessfully")
        return res.status(400).json({"message":"Friend Request Created Sucessfully"})
    }

    catch(error){

        console.log("Error in Sending Friend Request", error)
        return res.status(400).json({"message":"Internal Server Error"})

    }
}

const AcceptFriendRequest = async (req, res)=>{

    try{

        const requestID = req.params.id;
        console.log("REQUEST ID", requestID)
        const friendRequest = await FriendRequestModel.findById(requestID)

        if(!friendRequest){

            console.log("Friend Request Not Found")
            return res.status(400).json({"message":"Friend Request Not Found"})
        }

        if(friendRequest.recipient.toString() != req.user.id){

            console.log("You Are Not Authorized To Accept This")
            return res.status(400).json({"message":"You Are Not Authorized To Accept This"})

        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        await userModel.findByIdAndUpdate(friendRequest.sender, {

            $addToSet:{friends:friendRequest.recipient}
        })

        await userModel.findByIdAndUpdate(friendRequest.recipient, {

            $addToSet:{friends:friendRequest.sender}
        })

        console.log("Friend Request Accepted")
        return res.status(200).json({"message":"Friend Request Accepted"})
    }

    catch(error){

        console.log("Error in Accepting Friend Request", error)
        return res.status(400).json({"message":"Internal Server Error"})
    }
}


const getFriendRequests = async(req, res)=> {
    
    try{
        console.log("USER ID", req.user.id)
        const incomingReqs = await FriendRequestModel.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");
    
        const acceptedReqs = await FriendRequestModel.find({
            sender: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName profilePic");
    
        return res.status(200).json({"message":"Incoming and Accepted Requests are found",  incomingReqs, acceptedReqs });
    } 
    
    catch(error){

        console.log("Error in getPendingFriendRequests controller", error.message);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
}
  
const getOutgoingFriendReqs = async(req, res)=> {

    try{

        const outgoingRequests = await FriendRequestModel.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");
  
        return res.status(200).json(outgoingRequests);
    } 
    
    catch(error){

        console.log("Error in getOutgoingFriendReqs controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}
export {GetRecommendedUsers,GetFriends, SendFriendRequest, AcceptFriendRequest, getFriendRequests, getOutgoingFriendReqs}
import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){

    console.error("Steam API key or Secret Missing");

}

const streamClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async(userData) =>{

    try{

        await streamClient.upsertUsers([userData]);
        return userData
    }

    catch(error){

        console.error("Error Upserting Stream user", error);
        
    }
}

export const generateStreamToken = (userID)=>{

    try{

        const userIdStr = userID.toString();
        return streamClient.createToken(userIdStr);
        
    } 
    
    catch(error){

        console.error("Error generating Stream token:", error);
    }
}
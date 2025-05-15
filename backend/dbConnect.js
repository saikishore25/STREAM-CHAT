import mongoose from "mongoose";

const connectToDB = async () =>{

    try{

        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected, ${connect.connection.host}`)
    }
    catch(error){

        console.log(`MongoDB Failed To Connect`)
        process.exit(1)
    }
}

export default connectToDB
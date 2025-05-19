import express from "express"
import "dotenv/config"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js";
import connectToDB from "./dbConnect.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 4001

connectToDB();

app.use(express.json())
app.use(cookieParser())

app.use(cors({

    origin:["https://stream-chat-frontend.vercel.app"],
    credentials: true
}))
app.get("/", (req, res)=>{

    res.json({"message":"API is Working Correctly"})
})


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes);
app.listen(PORT, ()=>{

    console.log(`Surver Running on PORT: ${PORT}`)
})
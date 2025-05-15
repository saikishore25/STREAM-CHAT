import axios from "axios"

export const axiosInstance = axios.create({

    baseURL:`https://stream-chat-backend.vercel.app`,
    withCredentials:true
})
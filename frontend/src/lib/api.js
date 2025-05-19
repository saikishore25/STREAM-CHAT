import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {

    const response = await axiosInstance.post("api/auth/signup", signupData);
    return response.data;
};

export const login = async (loginData) => {
    
    const response = await axiosInstance.post("api/auth/login", loginData);
    return response.data;
};

export const logout = async () => {

    const response = await axiosInstance.post("api/auth/logout");
    return response.data;
};
  
export const getAuthUser = async () => {
  try {
    const token = localStorage.getItem("token"); // or sessionStorage

    if (!token) {
      console.log("No token found");
      return null;
    }

    const res = await axiosInstance.get("api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};


export const completeProfileSetup = async (userData) => {
    
    const response = await axiosInstance.post("api/auth/profile-setup", userData);
    return response.data;
};
  

export async function getUserFriends(){

    const response = await axiosInstance.get("api/users/get-friends");
    return response.data;
}
  
export async function getRecommendedUsers(){

    const response = await axiosInstance.get("api/users/get-recommended-users");
    return response.data;
}
  
export async function getOutgoingFriendReqs(){

    const response = await axiosInstance.get("api/users/outgoing-friend-requests");
    return response.data;
}

export async function sendFriendRequest(userId){

    const response = await axiosInstance.post(`api/users/send-friend-request/${userId}`);
    return response.data;
}

export async function getFriendRequests(){

    const response = await axiosInstance.get("api/users/friend-requests");
    return response.data;
}

export async function acceptFriendRequest(requestId){

    const response = await axiosInstance.put(`api/users/accept-friend-request/${requestId}`);
    return response.data;
}

export async function getStreamToken(){

    const response = await axiosInstance.get("api/chat/token");
    return response.data;
}
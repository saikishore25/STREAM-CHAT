import jwt from "jsonwebtoken"

const generateJWTandSetCookie = async (userID, res) =>{

    const token = jwt.sign(
        {userID}, 
        process.env.JWT_SECRET,                   
        {expiresIn: '1h'}                     
    );

    res.cookie("authToken", token, {

        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    });
    
    return token;

}

export default generateJWTandSetCookie
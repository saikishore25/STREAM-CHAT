import jwt from "jsonwebtoken"

const generateJWTandSetCookie = async (userID, res) =>{

    const token = jwt.sign(
        {userID}, 
        process.env.JWT_SECRET,                   
        {expiresIn: '1h'}                     
    );

    res.cookie("authToken", token, {

        httpOnly: true,
        secure: true,          // needed on HTTPS
        sameSite: "None",      // required for cross-site cookie usage
        maxAge: 24 * 60 * 60 * 1000,
    });
    
    return token;

}

export default generateJWTandSetCookie
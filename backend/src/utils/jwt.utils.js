import jwt from "jsonwebtoken";

export const generateToken = (userData)=>{
    return jwt.sign(userData, process.env.JWT_SECRET,{
        expiresIn: "7d",
    });
};
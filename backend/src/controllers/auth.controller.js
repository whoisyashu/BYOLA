import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.utils.js";

/*    REGISTER    */

export const register = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exist",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
        });
        
        const token = generateToken({
            userId: user._id,
            role: user.role,
        });

        res.status(200).json({
            success: true,
            message: `User registered successfully.`,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: err.message,
        });
    }
}

/*    LOGIN    */
export const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }
        const token = generateToken({
            userId: user._id,
            role: user.role,
        })
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Login Failed",
            error: err.message,
        })
    }
}


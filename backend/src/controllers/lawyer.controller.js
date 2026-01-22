import LawyerProfile from "../models/LawyerProfile.model.js";
import User from "../models/User.model.js";

export const getLawyerProfile = async(req, res) => {
    if(req.user.role !== "lawyer"){
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }
    const profile = await LawyerProfile.findOne({
        userId: req.user._id,
    });
    
    if(!profile){
        return res.status(404).json({
            success: false,
            message: "Lawyer profile not found",
        });
    }
    res.status(200).json({
        success: true,
        profile,
    })
}

export const submitLawyerOnboarding = async(req, res) => {
    try{
        const { barCouncilId, specialization } = req.body;
        if(!barCouncilId){
            return res.status(400).json({
                success: false,
                message: "Bar Council Id is required",
            });
        }
        const existingProfile = await LawyerProfile.findOne({
            userId: req.user._id,
        });
        if(existingProfile){
            return res.status(409).json({
                success: false,
                message: "Onboarding already submitted",
            });
        }
        const profile = await LawyerProfile.create({
            userId: req.user._id,
            barCouncilId,
            specialization: specialization || [],
            onboardingStatus: "pending",
        });
        res.status(201).json({
            success: true,
            message: "Lawyer onboarding submitted successfully",
            profile,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to submit onboarding.",
            error: error.message,
        });
    }
}
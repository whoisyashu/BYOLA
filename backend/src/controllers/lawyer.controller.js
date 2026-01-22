import LawyerProfile from "../models/LawyerProfile.model.js";

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
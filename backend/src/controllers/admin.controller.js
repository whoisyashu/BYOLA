import LawyerProfile from "../models/LawyerProfile.model.js";

export const getPendingLawyers = async(req, res)=>{
    try{
        const lawyers = await LawyerProfile.find({
            onboardingStatus: "pending",
        }).populate("userId", "name email role");

        res.status(200).json({
            success: true,
            count: lawyers.length,
            lawyers,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to fetch pending lawyers",
            error: error.message,
        });
    }
}

export const approveLawyer = async(req, res)=>{
    try{
        const {lawyerProfileId} = req.params;
        const profile = await LawyerProfile.findById(lawyerProfileId);
        if(!profile){
            res.status(404).json({
                success: false,
                message: "Lawyer profile not found",
            });
        }
        if(profile.onboardingStatus === "approved"){
            return res.status(400).json({
                success: false,
                message: "Lawyer already approved",
            });
        }
        profile.onboardingStatus = "approved";
        await profile.save();
        res.status(200).json({
            success: true,
            message: "Lawyer approved successfully",
            profile,
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to approve lawyer",
            error: error.message,
        })
    }
}

export const rejectLawyer = async(req, res) => {
    try{
        const {lawyerProfileId} = req.params;

        const profile = await LawyerProfile.findById(lawyerProfileId);
        if(!profile){
            return res.status(404).json({
                succcess: false,
                message: "Lawyer profile not found",
            });
        }
        if(profile.onboardingStatus === "rejected"){
            return res.status(400).json({
                success: false,
                message: "Lawyer already rejected",
            });
        }
        profile.onboardingStatus = "rejected";
        await profile.save();

        res.status(200).json({
            success: true,
            message: "Lawyer rejected successfully",
            profile,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message:"Failed to reject lawyer"
        })
    }
}
import mongoose from "mongoose";

const lawyerProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    barCouncilId:{
        type: String,
        required: true,
    },

    specialization: {
        type: [String],
        default: [],
    },
    
    onboardingStatus:{
        type: String,
        enum:['pending', 'rejected', 'approved'],
        default: 'pending',
    }
},
{
    timestamps: true,
});

const LawyerProfile = mongoose.model("LawyerProfile", lawyerProfileSchema);

export default LawyerProfile;
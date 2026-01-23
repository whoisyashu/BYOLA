import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    category:{
        type: String,
        enum:[
            "criminal",
            "family",
            "property",
            "cyber",
            "consumer",
            "other",
        ],
        default: "other",
    },
    status:{
        type: String,
        enum: ["open", "assigned", "closed"],
        default: "open",
    },
},{
    timestamps: true,
});

export default mongoose.model("Case", caseSchema);
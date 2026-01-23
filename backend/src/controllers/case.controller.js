import Case from "../models/Case.model.js";
export const createCase = async(req, res) => {
    try{
        const {title, description, category} = req.body;
        if(!title || !description){
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }
        const newCase = await Case.create({
            userId: req.user._id,
            title,
            description,
            category,
        });
        res.status(201).json({
            success: true,
            message: "Case created successfully",
            case: newCase,
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to create case",
            error: error.message,
        })
    }
}
export const getMyCase = async(req, res) => {
    try{
        const cases = await Case.find({
            userId: req.user._id
        }).sort({createdAt: -1,});
        res.status(200).json({
            success: true,
            cases,
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch cases",
            error: error.message,
        })
    }
}
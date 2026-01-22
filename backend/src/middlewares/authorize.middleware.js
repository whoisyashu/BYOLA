export const authorize =(...allowedRoles)=>{
    return async(req, res, next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Forbidden : Access Denied",
            });
        }
        next();
    }
}
import ApiError from "../utils/ApiError.js";

const role = (...allowerdRoles) => {
    return (req, res, next ) => {
        if (!req.user || !allowerdRoles.includes(req.user.role)) {
            return next(new ApiError(403, "Access denied"));
        }

        next();
    };
};

export default role;

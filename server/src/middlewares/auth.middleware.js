import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user || !user.isActive) {
            throw new ApiError(401, "User not authorized");
        }

        req.user = {
            id: user.id,
            role: user.role,
        };

        next();
    } catch (error) {
        console.log(error);
        next(new ApiError(401, "Invalid or expired token"))
    }
};

export default auth;
import { queryObjects } from "node:v8";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    } catch (error) {
        next(new ApiError(400, error.errors[0].message));
    }
};

export default validate;
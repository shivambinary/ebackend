import { registerUser, loginUser } from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        console.log(req.body);
        res.status(201).json(new ApiResponse(201, user, "User register"));
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const data = await loginUser(req.body);
        res.status(200).json(new ApiResponse(200, data, "Login Successful"));
    } catch (err) {
        console.log(err);
        next (err);
    }
}

import { getProfile, updateProfile } from "../services/auth.service.js";

export const profile = async (req, res, next) => {
  try {
    const user = await getProfile(req.user.id);
    res.status(200).json(new ApiResponse(200, user));
  } catch (err) {
    next(err);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    const user = await updateProfile(req.user.id, req.body);
    res.status(200).json(new ApiResponse(200, user));
  } catch (err) {
    next(err);
  }
};

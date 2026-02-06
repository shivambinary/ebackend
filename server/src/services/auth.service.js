import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User already exist");
    }

    const user = await User.create({ name, email, password});
    return user;   
};


export const loginUser = async ({email, password}) => {
    const user = await User.findOne({email}).select("+password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid User or Password");
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {user, token};
}


export const getProfile = async (userId) => {
  return User.findById(userId);
};

export const updateProfile = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (data.password) {
    user.password = data.password; // will be hashed by model
  }

  if (data.name) user.name = data.name;

  await user.save();
  return user;
};

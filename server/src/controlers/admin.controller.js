import ApiResponse from "../utils/ApiResponse.js";
import { getDashboardStats } from "../services/admin.service.js";

export const dashboardStats = async (req, res, next) => {
  try {
    const stats = await getDashboardStats();
    res.status(200).json(new ApiResponse(200, stats));
  } catch (err) {
    next(err);
  }
};

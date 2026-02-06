import express from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import { dashboardStats } from "../controlers/admin.controller.js";


const router = express.Router();

router.use(auth, role("admin"));
router.get("/health", (req, res) => {
    res.json({ status: "Admin API OK" });
});
router.get("/stats", auth, role("admin"), dashboardStats);


export default router;
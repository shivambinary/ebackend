import express from "express";
import { register, login } from "../controlers/auth.controller.js";

import auth from "../middlewares/auth.middleware.js";
import { profile, updateProfileController } from "../controlers/auth.controller.js";


const router = express.Router();
router.post("/register", register);
router.post("/login", login);

router.get("/profile", auth, profile);
router.put("/profile", auth, updateProfileController);


export default router;
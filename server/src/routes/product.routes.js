import express from "express";
import { create, update, remove, getAll, getOne } from "../controlers/product.controller.js";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createProductSchema } from "../validators/product.validator.js";





const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post(
  "/",
  auth,
  role("admin"),
  upload.array("images", 5),
  create
);

router.delete("/:id", auth, role("admin"), remove);


export default router;

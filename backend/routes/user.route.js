import express from "express";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { permit } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", protect, permit("admin", "support"), getUsers);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, permit("admin"), deleteUser);

export default router;

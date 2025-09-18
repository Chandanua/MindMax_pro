import { Router } from "express";
import { router as auth } from "./auth.js";
import { router as checkins } from "./checkins.js";
import { router as users } from "./users.js";

export const router = Router();

router.use("/auth", auth);
router.use("/checkins", checkins);
router.use("/users", users);



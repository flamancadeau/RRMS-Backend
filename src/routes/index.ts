import { Router } from "express";
import authRoutes from "./authRoutes";
import residentRoutes from "./residentRoutes";
const router = Router();
router.use("/auth", authRoutes);
router.use("/residents", residentRoutes);
export default router;

import { Router } from "express";
import userRoutes from "./user.routes";
import provinceRoutes from "./province.routes";
import districtRoutes from "./district.routes";
const router = Router();

router.use("/users", userRoutes);
router.use("/provinces", provinceRoutes);
router.use("/districts", districtRoutes);

export default router;

import { Router } from "express";
import userRoutes from "./user.routes";
import provinceRoutes from "./province.routes";
import districtRoutes from "./district.routes";
import sectorRoutes from "./sector.routes";
import cellRoutes from "./cell.routes";
import villageRoutes from "./village.routes";
import householdRoutes from "./household.routes";
import residentRoutes from "./resident.routes";
import roleRoutes from "./role.routes";
import permissionRoutes from "./permission.routes";
import transferRequestRoutes from "./transferRequest.routes";
import transferHistoryRoutes from "./transferHistory.routes";
import notificationRoutes from "./notification.routes";
import auditLogRoutes from "./auditLog.routes";
import loginHistoryRoutes from "./loginHistory.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/provinces", provinceRoutes);
router.use("/districts", districtRoutes);
router.use("/sectors", sectorRoutes);
router.use("/cells", cellRoutes);
router.use("/villages", villageRoutes);
router.use("/households", householdRoutes);
router.use("/residents", residentRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/transfer-requests", transferRequestRoutes);
router.use("/transfer-histories", transferHistoryRoutes);
router.use("/notifications", notificationRoutes);
router.use("/audit-logs", auditLogRoutes);
router.use("/login-histories", loginHistoryRoutes);

export default router;

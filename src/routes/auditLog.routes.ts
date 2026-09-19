import { Router } from "express";
import * as auditLogController from "../controllers/auditLog.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createAuditLogSchema,
  updateAuditLogSchema,
  auditLogIdSchema,
} from "../validators/AuditLog.validator";

const router = Router();

router.post(
  "/",
  validate(createAuditLogSchema, "body"),
  asyncHandler(auditLogController.createAuditLog)
);

router.get(
  "/",
  asyncHandler(auditLogController.getAuditLogs)
);

router.get(
  "/:id",
  validate(auditLogIdSchema, "params"),
  asyncHandler(auditLogController.getAuditLog)
);

router.put(
  "/:id",
  validate(auditLogIdSchema, "params"),
  validate(updateAuditLogSchema, "body"),
  asyncHandler(auditLogController.updateAuditLog)
);

router.delete(
  "/:id",
  validate(auditLogIdSchema, "params"),
  asyncHandler(auditLogController.deleteAuditLog)
);

router.patch(
  "/:id/restore",
  validate(auditLogIdSchema, "params"),
  asyncHandler(auditLogController.restoreAuditLog)
);

export default router;

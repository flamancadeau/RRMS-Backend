import { Router } from "express";
import * as loginHistoryController from "../controllers/loginHistory.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createLoginHistorySchema,
  updateLoginHistorySchema,
  loginHistoryIdSchema,
} from "../validators/LoginHistory.validator";

const router = Router();

router.post(
  "/",
  validate(createLoginHistorySchema, "body"),
  asyncHandler(loginHistoryController.createLoginHistory)
);

router.get(
  "/",
  asyncHandler(loginHistoryController.getLoginHistorys)
);

router.get(
  "/:id",
  validate(loginHistoryIdSchema, "params"),
  asyncHandler(loginHistoryController.getLoginHistory)
);

router.put(
  "/:id",
  validate(loginHistoryIdSchema, "params"),
  validate(updateLoginHistorySchema, "body"),
  asyncHandler(loginHistoryController.updateLoginHistory)
);

router.delete(
  "/:id",
  validate(loginHistoryIdSchema, "params"),
  asyncHandler(loginHistoryController.deleteLoginHistory)
);

router.patch(
  "/:id/restore",
  validate(loginHistoryIdSchema, "params"),
  asyncHandler(loginHistoryController.restoreLoginHistory)
);

export default router;

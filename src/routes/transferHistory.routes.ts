import { Router } from "express";
import * as transferHistoryController from "../controllers/transferHistory.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createTransferHistorySchema,
  updateTransferHistorySchema,
  transferHistoryIdSchema,
} from "../validators/TransferHistory.validator";

const router = Router();

router.post(
  "/",
  validate(createTransferHistorySchema, "body"),
  asyncHandler(transferHistoryController.createTransferHistory)
);

router.get(
  "/",
  asyncHandler(transferHistoryController.getTransferHistorys)
);

router.get(
  "/:id",
  validate(transferHistoryIdSchema, "params"),
  asyncHandler(transferHistoryController.getTransferHistory)
);

router.put(
  "/:id",
  validate(transferHistoryIdSchema, "params"),
  validate(updateTransferHistorySchema, "body"),
  asyncHandler(transferHistoryController.updateTransferHistory)
);

router.delete(
  "/:id",
  validate(transferHistoryIdSchema, "params"),
  asyncHandler(transferHistoryController.deleteTransferHistory)
);

router.patch(
  "/:id/restore",
  validate(transferHistoryIdSchema, "params"),
  asyncHandler(transferHistoryController.restoreTransferHistory)
);

export default router;

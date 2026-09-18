import { Router } from "express";
import * as transferRequestController from "../controllers/transferRequest.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createTransferRequestSchema,
  updateTransferRequestSchema,
  transferRequestIdSchema,
} from "../validators/TransferRequest.validator";

const router = Router();

router.post(
  "/",
  validate(createTransferRequestSchema, "body"),
  asyncHandler(transferRequestController.createTransferRequest)
);

router.get(
  "/",
  asyncHandler(transferRequestController.getTransferRequests)
);

router.get(
  "/:id",
  validate(transferRequestIdSchema, "params"),
  asyncHandler(transferRequestController.getTransferRequest)
);

router.put(
  "/:id",
  validate(transferRequestIdSchema, "params"),
  validate(updateTransferRequestSchema, "body"),
  asyncHandler(transferRequestController.updateTransferRequest)
);

router.delete(
  "/:id",
  validate(transferRequestIdSchema, "params"),
  asyncHandler(transferRequestController.deleteTransferRequest)
);

router.patch(
  "/:id/restore",
  validate(transferRequestIdSchema, "params"),
  asyncHandler(transferRequestController.restoreTransferRequest)
);

export default router;

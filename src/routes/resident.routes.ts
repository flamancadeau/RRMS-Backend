import { Router } from "express";
import * as residentController from "../controllers/resident.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createResidentSchema,
  updateResidentSchema,
  residentIdSchema,
} from "../validators/Resident.validator";

const router = Router();

router.post(
  "/",
  validate(createResidentSchema, "body"),
  asyncHandler(residentController.createResident)
);

router.get(
  "/",
  asyncHandler(residentController.getResidents)
);

router.get(
  "/:id",
  validate(residentIdSchema, "params"),
  asyncHandler(residentController.getResident)
);

router.put(
  "/:id",
  validate(residentIdSchema, "params"),
  validate(updateResidentSchema, "body"),
  asyncHandler(residentController.updateResident)
);

router.delete(
  "/:id",
  validate(residentIdSchema, "params"),
  asyncHandler(residentController.deleteResident)
);

router.patch(
  "/:id/restore",
  validate(residentIdSchema, "params"),
  asyncHandler(residentController.restoreResident)
);

export default router;

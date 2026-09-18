import { Router } from "express";
import * as householdController from "../controllers/household.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createHouseholdSchema,
  updateHouseholdSchema,
  householdIdSchema,
} from "../validators/Household.validator";

const router = Router();

router.post(
  "/",
  validate(createHouseholdSchema, "body"),
  asyncHandler(householdController.createHousehold)
);

router.get(
  "/",
  asyncHandler(householdController.getHouseholds)
);

router.get(
  "/:id",
  validate(householdIdSchema, "params"),
  asyncHandler(householdController.getHousehold)
);

router.put(
  "/:id",
  validate(householdIdSchema, "params"),
  validate(updateHouseholdSchema, "body"),
  asyncHandler(householdController.updateHousehold)
);

router.delete(
  "/:id",
  validate(householdIdSchema, "params"),
  asyncHandler(householdController.deleteHousehold)
);

router.patch(
  "/:id/restore",
  validate(householdIdSchema, "params"),
  asyncHandler(householdController.restoreHousehold)
);

export default router;

import { Router } from "express";
import * as districtController from "../controllers/district.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createDistrictSchema,
  updateDistrictSchema,
  districtIdSchema,
} from "../validators/District.validator";

const router = Router();


router.post(
  "/",
  validate(createDistrictSchema, "body"),
  asyncHandler(districtController.createDistrict)
);


router.get(
  "/",
  asyncHandler(districtController.getDistricts)
);


router.get(
  "/:id",
  validate(districtIdSchema, "params"),
  asyncHandler(districtController.getDistrict)
);


router.put(
  "/:id",
  validate(districtIdSchema, "params"),
  validate(updateDistrictSchema, "body"),
  asyncHandler(districtController.updateDistrict)
);


router.delete(
  "/:id",
  validate(districtIdSchema, "params"),
  asyncHandler(districtController.deleteDistrict)
);


router.patch(
  "/:id/restore",
  validate(districtIdSchema, "params"),
  asyncHandler(districtController.restoreDistrict)
);

export default router;

import { Router } from "express";
import * as villageController from "../controllers/village.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createVillageSchema,
  updateVillageSchema,
  villageIdSchema,
} from "../validators/Village.validator";

const router = Router();

router.post(
  "/",
  validate(createVillageSchema, "body"),
  asyncHandler(villageController.createVillage)
);

router.get(
  "/",
  asyncHandler(villageController.getVillages)
);

router.get(
  "/:id",
  validate(villageIdSchema, "params"),
  asyncHandler(villageController.getVillage)
);

router.put(
  "/:id",
  validate(villageIdSchema, "params"),
  validate(updateVillageSchema, "body"),
  asyncHandler(villageController.updateVillage)
);

router.delete(
  "/:id",
  validate(villageIdSchema, "params"),
  asyncHandler(villageController.deleteVillage)
);

router.patch(
  "/:id/restore",
  validate(villageIdSchema, "params"),
  asyncHandler(villageController.restoreVillage)
);

export default router;

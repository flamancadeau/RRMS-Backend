import { Router } from "express";
import * as sectorController from "../controllers/sector.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createSectorSchema,
  updateSectorSchema,
  sectorIdSchema,
} from "../validators/Sector.validator";

const router = Router();

router.post(
  "/",
  validate(createSectorSchema, "body"),
  asyncHandler(sectorController.createSector)
);

router.get(
  "/",
  asyncHandler(sectorController.getSectors)
);

router.get(
  "/:id",
  validate(sectorIdSchema, "params"),
  asyncHandler(sectorController.getSector)
);

router.put(
  "/:id",
  validate(sectorIdSchema, "params"),
  validate(updateSectorSchema, "body"),
  asyncHandler(sectorController.updateSector)
);

router.delete(
  "/:id",
  validate(sectorIdSchema, "params"),
  asyncHandler(sectorController.deleteSector)
);

router.patch(
  "/:id/restore",
  validate(sectorIdSchema, "params"),
  asyncHandler(sectorController.restoreSector)
);

export default router;

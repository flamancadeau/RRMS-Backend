import { Router } from "express";
import * as cellController from "../controllers/cell.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createCellSchema,
  updateCellSchema,
  cellIdSchema,
} from "../validators/Cell.validator";

const router = Router();

router.post(
  "/",
  validate(createCellSchema, "body"),
  asyncHandler(cellController.createCell)
);

router.get(
  "/",
  asyncHandler(cellController.getCells)
);

router.get(
  "/:id",
  validate(cellIdSchema, "params"),
  asyncHandler(cellController.getCell)
);

router.put(
  "/:id",
  validate(cellIdSchema, "params"),
  validate(updateCellSchema, "body"),
  asyncHandler(cellController.updateCell)
);

router.delete(
  "/:id",
  validate(cellIdSchema, "params"),
  asyncHandler(cellController.deleteCell)
);

router.patch(
  "/:id/restore",
  validate(cellIdSchema, "params"),
  asyncHandler(cellController.restoreCell)
);

export default router;

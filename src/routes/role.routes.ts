import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createRoleSchema,
  updateRoleSchema,
  roleIdSchema,
} from "../validators/Role.validator";

const router = Router();

router.post(
  "/",
  validate(createRoleSchema, "body"),
  asyncHandler(roleController.createRole)
);

router.get(
  "/",
  asyncHandler(roleController.getRoles)
);

router.get(
  "/:id",
  validate(roleIdSchema, "params"),
  asyncHandler(roleController.getRole)
);

router.put(
  "/:id",
  validate(roleIdSchema, "params"),
  validate(updateRoleSchema, "body"),
  asyncHandler(roleController.updateRole)
);

router.delete(
  "/:id",
  validate(roleIdSchema, "params"),
  asyncHandler(roleController.deleteRole)
);

router.patch(
  "/:id/restore",
  validate(roleIdSchema, "params"),
  asyncHandler(roleController.restoreRole)
);

export default router;

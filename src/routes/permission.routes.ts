import { Router } from "express";
import * as permissionController from "../controllers/permission.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createPermissionSchema,
  updatePermissionSchema,
  permissionIdSchema,
} from "../validators/Permission.validator";

const router = Router();

router.post(
  "/",
  validate(createPermissionSchema, "body"),
  asyncHandler(permissionController.createPermission)
);

router.get(
  "/",
  asyncHandler(permissionController.getPermissions)
);

router.get(
  "/:id",
  validate(permissionIdSchema, "params"),
  asyncHandler(permissionController.getPermission)
);

router.put(
  "/:id",
  validate(permissionIdSchema, "params"),
  validate(updatePermissionSchema, "body"),
  asyncHandler(permissionController.updatePermission)
);

router.delete(
  "/:id",
  validate(permissionIdSchema, "params"),
  asyncHandler(permissionController.deletePermission)
);

router.patch(
  "/:id/restore",
  validate(permissionIdSchema, "params"),
  asyncHandler(permissionController.restorePermission)
);

export default router;

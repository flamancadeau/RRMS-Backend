import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../validators/User.validator";

const router = Router();

router.post(
  "/",
  validate(createUserSchema, "body"),
  asyncHandler(userController.createUser)
);

router.get(
  "/",
  asyncHandler(userController.getUsers)
);

router.get(
  "/:id",
  validate(userIdSchema, "params"),
  asyncHandler(userController.getUser)
);

router.put(
  "/:id",
  validate(userIdSchema, "params"),
  validate(updateUserSchema, "body"),
  asyncHandler(userController.updateUser)
);

router.delete(
  "/:id",
  validate(userIdSchema, "params"),
  asyncHandler(userController.deleteUser)
);

router.patch(
  "/:id/restore",
  validate(userIdSchema, "params"),
  asyncHandler(userController.restoreUser)
);

export default router;

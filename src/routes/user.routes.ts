import { Router } from "express";

import * as userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema } from "../validators/User.validator";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();

router.post(
  "/",
  validate(createUserSchema),
  asyncHandler(userController.createUser),
);

export default router;

import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema } from "../validators/User.validator";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();

router.post( "/",validate(createUserSchema),asyncHandler(userController.createUser));
router.get("/", validate(createUserSchema), asyncHandler(userController.getUsers));
router.get("/:id", validate(createUserSchema), asyncHandler(userController.getUser));
router.delete("/:id", validate(createUserSchema), asyncHandler(userController.deleteUser));
router.put("/:id", validate(createUserSchema), asyncHandler(userController.updateUser));

export default router;

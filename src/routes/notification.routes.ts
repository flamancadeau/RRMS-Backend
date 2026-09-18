import { Router } from "express";
import * as notificationController from "../controllers/notification.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
  createNotificationSchema,
  updateNotificationSchema,
  notificationIdSchema,
} from "../validators/Notification.validator";

const router = Router();

router.post(
  "/",
  validate(createNotificationSchema, "body"),
  asyncHandler(notificationController.createNotification)
);

router.get(
  "/",
  asyncHandler(notificationController.getNotifications)
);

router.get(
  "/:id",
  validate(notificationIdSchema, "params"),
  asyncHandler(notificationController.getNotification)
);

router.put(
  "/:id",
  validate(notificationIdSchema, "params"),
  validate(updateNotificationSchema, "body"),
  asyncHandler(notificationController.updateNotification)
);

router.delete(
  "/:id",
  validate(notificationIdSchema, "params"),
  asyncHandler(notificationController.deleteNotification)
);

router.patch(
  "/:id/restore",
  validate(notificationIdSchema, "params"),
  asyncHandler(notificationController.restoreNotification)
);

export default router;

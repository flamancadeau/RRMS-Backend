import { Request, Response } from "express";
import * as notificationService from "../services/notification.service";

/**
 * Create Notification
 */
export const createNotification = async (
  req: Request,
  res: Response
) => {
  const notification = await notificationService.createNotification(req.body);

  return res.status(201).json({
    success: true,
    message: "Notification created successfully",
    data: notification,
  });
};

/**
 * Get all Notifications
 */
export const getNotifications = async (
  req: Request,
  res: Response
) => {
  const items = await notificationService.getNotifications();

  return res.status(200).json({
    success: true,
    data: items,
  });
};

/**
 * Get Notification by ID
 */
export const getNotification = async (
  req: Request,
  res: Response
) => {
  const notification = await notificationService.getNotification(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: notification,
  });
};

/**
 * Update Notification
 */
export const updateNotification = async (
  req: Request,
  res: Response
) => {
  const notification = await notificationService.updateNotification(
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Notification updated successfully",
    data: notification,
  });
};

/**
 * Delete Notification
 */
export const deleteNotification = async (
  req: Request,
  res: Response
) => {
  await notificationService.deleteNotification(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
  });
};

/**
 * Restore Notification
 */
export const restoreNotification = async (
  req: Request,
  res: Response
) => {
  const notification = await notificationService.restoreNotification(
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Notification restored successfully",
    data: notification,
  });
};

import { Request, Response, NextFunction } from "express";
export const checkPermission = (req: Request, res: Response, next: NextFunction) => { next(); };

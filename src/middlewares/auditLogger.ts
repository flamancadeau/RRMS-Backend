import { Request, Response, NextFunction } from "express";
export const auditLogger = (req: Request, res: Response, next: NextFunction) => { next(); };

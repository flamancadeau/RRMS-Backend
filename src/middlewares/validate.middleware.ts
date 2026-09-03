import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (
  schema: ZodSchema,
  source: "body" | "params" | "query" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];

    const result = schema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    if (source === "body") {
      req.body = result.data;
    }

    if (source === "params") {
      req.params = result.data;
    }

    if (source === "query") {
      req.query = result.data;
    }

    next();
  };
};

import { Router } from "express";
import * as provinceController from "../controllers/province.controller";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";

import {
    createProvinceSchema,
    updateProvinceSchema,
    provinceIdSchema
} from "../validators/Province.validator";

const router = Router();

router.post(
    "/",
    validate(createProvinceSchema, "body"),
    asyncHandler(provinceController.createProvince)
);


router.get(
    "/",
    asyncHandler(provinceController.getProvinces)
);


router.get(
    "/:id",
    validate(provinceIdSchema, "params"),
    asyncHandler(provinceController.getProvince)
);


router.put(
    "/:id",
    validate(provinceIdSchema, "params"),
    validate(updateProvinceSchema, "body"),
    asyncHandler(provinceController.updateProvince)
);


router.delete(
    "/:id",
    validate(provinceIdSchema, "params"),
    asyncHandler(provinceController.deleteProvince)
);


router.patch(
    "/:id/restore",
    validate(provinceIdSchema, "params"),
    asyncHandler(provinceController.restoreProvince)
);

export default router;

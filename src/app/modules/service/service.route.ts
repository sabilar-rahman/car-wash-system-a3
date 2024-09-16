import express from "express";
import { ServiceController } from "./service.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import serviceValidationSchema from "./service.validation";

const router = express.Router();

// router.get('/',OfferServices.)

router.post(
  "/",
  ValidateRequest(serviceValidationSchema),
  ServiceController.createService
);

export const ServiceRoutes = router;

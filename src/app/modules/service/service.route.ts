import express from "express";
import { ServiceController } from "./service.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { serviceValidation } from "./service.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// router.get('/',OfferServices.)

router.post(
  "/", auth(USER_ROLE.admin),
  ValidateRequest(serviceValidation.serviceCreateValidationSchema),
  ServiceController.createService
);

router.get("/", ServiceController.getAllServices);

router.get("/:id", ServiceController.getSingleService);

router.put(
  "/:id",auth(USER_ROLE.admin),
  ValidateRequest(serviceValidation.serviceUpdateValidationSchema),
  ServiceController.updateSingleService
);

router.delete("/:id",auth(USER_ROLE.admin), ServiceController.deleteSingleService);
export const ServiceRoutes = router;

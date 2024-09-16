import express from "express";
import { ServiceController } from "./service.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { serviceValidation } from "./service.validation";



const router = express.Router();

// router.get('/',OfferServices.)

router.post(
  "/",
  ValidateRequest(serviceValidation.serviceCreateValidationSchema),
  ServiceController.createService
);

router.get("/", ServiceController.getAllServices);

router.get("/:id", ServiceController.getSingleService);


router.patch('/:id',ValidateRequest(serviceValidation.serviceUpdateValidationSchema),ServiceController.updateSingleService)


router.delete('/:id',ServiceController.deleteSingleService)
export const ServiceRoutes = router;

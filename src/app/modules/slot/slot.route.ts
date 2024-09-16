import { Router } from "express";
import { SlotController } from "./slot.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { SlotValidations } from "./slot.validation";

const router = Router();

router.post(
  "/slots",
  ValidateRequest(SlotValidations.slotCreateValidationSchema),
  SlotController.createSlot
);

router.get("/availability", SlotController.getAllSlot);

export const SlotRoutes = router;

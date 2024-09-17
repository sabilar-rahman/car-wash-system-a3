import { Router } from "express";
import { SlotController } from "./slot.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { SlotValidations } from "./slot.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/slots",auth(USER_ROLE.admin),
  ValidateRequest(SlotValidations.slotCreateValidationSchema),
  SlotController.createSlot
);

router.get("/availability", SlotController.getAllSlot);

export const SlotRoutes = router;

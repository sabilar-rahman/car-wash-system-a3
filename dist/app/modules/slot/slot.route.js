"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
// import ValidateRequest from "../../middlewares/ValidateRequest";
// import { SlotValidations } from "./slot.validation";
// import auth from "../../middlewares/auth";
// import { USER_ROLE } from "../user/user.constant";
const router = (0, express_1.Router)();
// router.post(
//   "/",auth(USER_ROLE.admin),
//   ValidateRequest(SlotValidations.slotCreateValidationSchema),
//   SlotController.createSlot
// );
router.get("/availability", slot_controller_1.SlotController.getAllSlot);
exports.SlotRoutes = router;

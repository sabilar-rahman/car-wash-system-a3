"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const slot_validation_1 = require("./slot.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, ValidateRequest_1.default)(slot_validation_1.SlotValidations.slotCreateValidationSchema), slot_controller_1.SlotController.createSlot);
router.get("/availability", slot_controller_1.SlotController.getAllSlot);
exports.SlotRoutes = router;

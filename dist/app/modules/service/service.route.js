"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const service_validation_1 = require("./service.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const slot_controller_1 = require("../slot/slot.controller");
const slot_validation_1 = require("../slot/slot.validation");
const router = express_1.default.Router();
// router.get('/',OfferServices.)
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, ValidateRequest_1.default)(service_validation_1.serviceValidation.serviceCreateValidationSchema), service_controller_1.ServiceController.createService);
router.get("/", service_controller_1.ServiceController.getAllServices);
router.get("/:id", service_controller_1.ServiceController.getSingleService);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, ValidateRequest_1.default)(service_validation_1.serviceValidation.serviceUpdateValidationSchema), service_controller_1.ServiceController.updateSingleService);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), service_controller_1.ServiceController.deleteSingleService);
// create slot for service
router.post("/slots", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, ValidateRequest_1.default)(slot_validation_1.SlotValidations.slotCreateValidationSchema), slot_controller_1.SlotController.createSlot);
exports.ServiceRoutes = router;

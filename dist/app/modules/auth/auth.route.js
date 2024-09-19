"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
// ------------------------------------------------------------
// 1. User Signup Route
// ------------------------------------------------------------
/**
 * POST /signup
 *
 * This route handles user registration. It validates the request body
 * using `UserValidation.userCreateValidationSchema` and then calls the
 * `registeredUser` controller to create a new user.
 */
router.post("/signup", (0, ValidateRequest_1.default)(user_validation_1.UserValidation.userCreateValidationSchema), auth_controller_1.AuthControllers.registeredUser);
// ------------------------------------------------------------
// 2. User Login Route
// ------------------------------------------------------------
/**
 * POST /login
 *
 * This route handles user login. It validates the request body
 * using `AuthValidation.loginUserValidationSchema` and then calls
 * the `loginUser` controller to authenticate the user.
 */
router.post("/login", (0, ValidateRequest_1.default)(auth_validation_1.AuthValidation.loginUserValidationSchema), auth_controller_1.AuthControllers.loginUser);
exports.AuthRoutes = router;

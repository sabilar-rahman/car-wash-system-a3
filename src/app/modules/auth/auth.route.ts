import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";

const router = Router();

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
router.post(
  "/signup",
  ValidateRequest(UserValidation.userCreateValidationSchema),
  AuthControllers.registeredUser
);

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
router.post(
  "/login",
  ValidateRequest(AuthValidation.loginUserValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;

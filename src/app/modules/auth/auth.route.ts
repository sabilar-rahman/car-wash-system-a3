import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  ValidateRequest(UserValidation.userCreateValidationSchema),
  AuthControllers.registeredUser
);

router.post(
    '/login',
    ValidateRequest(AuthValidation.loginUserValidationSchema),
    AuthControllers.loginUser,
  )
  

export const AuthRoutes = router;

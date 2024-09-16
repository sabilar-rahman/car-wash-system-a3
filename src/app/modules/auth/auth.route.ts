import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { UserValidation } from "../user/user.validation";

const router = Router();

router.post(
  "/signup",
  ValidateRequest(UserValidation.userCreateValidationSchema),
  AuthControllers.registeredUser
);

export const AuthRoutes = router;

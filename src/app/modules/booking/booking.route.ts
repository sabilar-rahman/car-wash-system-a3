import { Router } from "express";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/bookings",
  auth(USER_ROLE.user),
  ValidateRequest(BookingValidation.bookingCreateValidationSchema),
  BookingController.createBooking
);

router.get("/bookings", auth(USER_ROLE.admin), BookingController.getAllBooking);

router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  BookingController.getUserBookings
);

export const BookingRoutes = router;

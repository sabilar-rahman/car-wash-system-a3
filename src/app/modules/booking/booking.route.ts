import { Router } from "express";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const routerNo1 = Router();
const routerNo11 = Router();
const routerNo2 = Router();
// different route
routerNo1.post(
  "/",
auth(USER_ROLE.user),
  ValidateRequest(BookingValidation.bookingCreateValidationSchema),
  BookingController.createBooking
);
routerNo11.get("/", auth(USER_ROLE.user), BookingController.getUserBookings);

routerNo2.get("/", auth(USER_ROLE.admin), BookingController.getAllBooking);

export const UserPostBookingRoutes = routerNo1;
export const UserGetBookingRoutes = routerNo11;
export const AdminBookingRoutes = routerNo2;

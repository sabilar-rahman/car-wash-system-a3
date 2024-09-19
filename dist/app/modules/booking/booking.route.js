"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBookingRoutes = exports.UserGetBookingRoutes = exports.UserPostBookingRoutes = void 0;
const express_1 = require("express");
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const routerNo1 = (0, express_1.Router)();
const routerNo11 = (0, express_1.Router)();
const routerNo2 = (0, express_1.Router)();
// different route
// ------------------------------------------------------------
// 1. Router for User to Create a Booking (POST /)
// ------------------------------------------------------------
routerNo1.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, ValidateRequest_1.default)(booking_validation_1.BookingValidation.bookingCreateValidationSchema), booking_controller_1.BookingController.createBooking);
// ------------------------------------------------------------
// 2. Router for User to Retrieve Their Bookings (GET /)
// ------------------------------------------------------------
routerNo11.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingController.getUserBookings);
// ------------------------------------------------------------
// 3. Router for Admin to Retrieve All Bookings (GET /)
// ------------------------------------------------------------
routerNo2.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingController.getAllBooking);
exports.UserPostBookingRoutes = routerNo1;
exports.UserGetBookingRoutes = routerNo11;
exports.AdminBookingRoutes = routerNo2;

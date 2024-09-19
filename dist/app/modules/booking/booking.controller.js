"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
// ============================================================
// Booking Controllers
// ============================================================
/**
 * Creates a new booking for a service.
 *
 * This controller extracts booking details from the request body,
 * modifies the object to match the booking schema, and passes the
 * user and booking details to the `BookingServices.createBookingIntoDB` service.
 * The response includes the populated booking details.
 *
 * Key functionalities:
 * - Extract booking details from request body
 * - Modify the object to match the booking schema
 * - Call service to create booking and populate customer, service, and slot details
 * - Return a success message with the booking data
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // ------------------------------------------------------------
    // 1. Extract Booking Details from Request Body
    // ------------------------------------------------------------
    const { serviceId: service, slotId: slot, vehicleType, vehicleBrand, vehicleModel, manufacturingYear, registrationPlate, } = req.body;
    // ------------------------------------------------------------
    // 2. Modify Object to Match Booking Schema
    // ------------------------------------------------------------
    const modifiedObj = {
        service: service,
        slot: slot,
        vehicleType,
        vehicleBrand,
        vehicleModel,
        manufacturingYear,
        registrationPlate,
    };
    // ------------------------------------------------------------
    // 3. Create Booking and Populate Related Fields
    // ------------------------------------------------------------
    const result = yield (yield (yield (yield booking_service_1.BookingServices.createBookingIntoDB(modifiedObj, user)).populate('customer')).populate('service')).populate('slot');
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Booking successful',
        data: result,
    });
}));
/**
 * Retrieves all bookings from the database.
 *
 * This controller calls the `BookingServices.getAllBookingsFromDB` service
 * to retrieve all the bookings and sends the data back in the response.
 *
 * Key functionalities:
 * - Call service to get all bookings
 * - Return a success message with the list of bookings
 *
 */
const getAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ------------------------------------------------------------
    // 1. Get All Bookings from the Database
    // ------------------------------------------------------------
    const result = yield booking_service_1.BookingServices.getAllBookingsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All bookings retrieved successfully",
        data: result,
    });
}));
/**
 * Retrieves bookings for the logged-in user.
 *
 * This controller gets the authenticated user's information from the request object,
 * calls the `BookingServices.getUserBookingsFromDB` service to retrieve the user's
 * bookings, and sends the data back in the response.
 *
 * Key functionalities:
 * - Extract user information from request object
 * - Call service to get bookings for the specific user
 * - Return a success message with the user's bookings
 */
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // ------------------------------------------------------------
    // 1. Get Bookings for the Logged-in User
    // ------------------------------------------------------------
    const result = yield booking_service_1.BookingServices.getUserBookingsFromDB(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result,
    });
}));
exports.BookingController = {
    createBooking,
    getAllBooking,
    getUserBookings,
};

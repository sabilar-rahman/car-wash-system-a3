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
exports.BookingServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("../slot/slot.model");
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const mongoose_1 = __importDefault(require("mongoose"));
// ============================================================
// Booking Services
// ============================================================
/**
 * Creates a booking in the database.
 *
 * This function initiates a database transaction to create a booking and
 * update the slot status. It ensures that the customer, service, and slot
 * exist, and that the slot is available before proceeding with the booking.
 *
 * Key functionalities:
 * - Check if the user (customer) exists
 * - Validate the service and slot availability
 * - Create a booking and update the slot status in a single transaction
 *
 * @param {TBooking} payload - The booking data
 * @param {JwtPayload} user - The authenticated user's details (customer)
 * @returns {Promise<Booking>} - The newly created booking
 * @throws {AppError} - If any validation fails (customer, service, slot, etc.)
 */
const createBookingIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // ------------------------------------------------------------
        // 1. Find Customer (User) from the Database
        // ------------------------------------------------------------
        const customer = yield user_model_1.UserModel.findOne({ email: user === null || user === void 0 ? void 0 : user.userEmail });
        const customerId = customer === null || customer === void 0 ? void 0 : customer._id;
        // Check if the customer exists
        if (!customer) {
            throw new AppError_1.default(404, "Customer not found");
        }
        // ------------------------------------------------------------
        // 2. Validate Service Exists and Is Available
        // ------------------------------------------------------------
        const serviceId = payload === null || payload === void 0 ? void 0 : payload.service;
        const service = yield service_model_1.Service.isServiceExists(serviceId);
        // Check if the service exists
        if (!service) {
            throw new AppError_1.default(404, "Service not found!");
        }
        // Check if the service is deleted
        if (service.isDeleted) {
            throw new AppError_1.default(400, "Unable to book, service is deleted");
        }
        // ------------------------------------------------------------
        // 3. Validate Slot Exists and Is Available
        // ------------------------------------------------------------
        const isSlotExists = yield slot_model_1.SlotModel.findById(payload.slot);
        // Check if the slot exists
        if (!isSlotExists) {
            throw new AppError_1.default(404, "Slot not found!");
        }
        // Check if the slot is already booked
        if (isSlotExists.isBooked === "booked") {
            throw new AppError_1.default(404, "Slot is already booked!");
        }
        // ------------------------------------------------------------
        // 4. Create Booking and Update Slot Status in a Transaction
        // ------------------------------------------------------------
        // Create the booking (transaction-1)
        const [booking] = yield booking_model_1.BookingModel.create([Object.assign(Object.assign({}, payload), { customer: customerId })], { session });
        // Update the slot's status to 'booked' (transaction-2)
        yield slot_model_1.SlotModel.findByIdAndUpdate(payload.slot, { isBooked: "booked" }, { new: true, session });
        // Commit the transaction
        yield session.commitTransaction();
        yield session.endSession();
        return booking;
    }
    catch (err) {
        // Abort the transaction in case of error
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
/**
 *
 * Retrieves all bookings from the database.
 *
 * This function fetches all bookings and populates the customer, service,
 * and slot fields to return detailed booking information.
 *
 * Key functionalities:
 * - Fetch all bookings from the `BookingModel`
 * - Populate the customer, service, and slot details
 *
 *
 * @returns {Promise<Booking[]>} - An array of all bookings with details
 */
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // ------------------------------------------------------------
    // 1. Get All Bookings with Populated Fields
    // ------------------------------------------------------------
    const result = yield booking_model_1.BookingModel.find()
        .populate("customer")
        .populate("service")
        .populate("slot");
    return result;
});
/**
 * Retrieves bookings for a specific user (customer) from the database.
 *
 * This function fetches all bookings made by a specific user and populates
 * the customer, service, and slot fields for detailed information.
 *
 * Key functionalities:
 * - Find the user by email
 * - Fetch the user's bookings from the `BookingModel`
 * - Populate the customer, service, and slot details
 *
 * @param {JwtPayload} user - The authenticated user's details (customer)
 * @returns {Promise<Booking[]>} - An array of the user's bookings with details
 */
const getUserBookingsFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // ------------------------------------------------------------
    // 1. Find the User by Email
    // ------------------------------------------------------------
    const customer = yield user_model_1.UserModel.findOne({ email: user === null || user === void 0 ? void 0 : user.userEmail });
    const customerId = customer === null || customer === void 0 ? void 0 : customer._id;
    // ------------------------------------------------------------
    // 2. Get the User's Bookings with Populated Fields
    // ------------------------------------------------------------
    const result = yield booking_model_1.BookingModel.find({ customer: customerId })
        .populate("customer")
        .populate("service")
        .populate("slot");
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
};

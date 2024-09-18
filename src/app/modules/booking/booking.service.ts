/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import mongoose from "mongoose";

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

const createBookingIntoDB = async (payload: TBooking, user: JwtPayload) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // ------------------------------------------------------------
    // 1. Find Customer (User) from the Database
    // ------------------------------------------------------------
    const customer = await UserModel.findOne({ email: user?.userEmail });
    const customerId = customer?._id;

    // Check if the customer exists
    if (!customer) {
      throw new AppError(404, "Customer not found");
    }

    // ------------------------------------------------------------
    // 2. Validate Service Exists and Is Available
    // ------------------------------------------------------------
    const serviceId: any = payload?.service;
    const service = await Service.isServiceExists(serviceId);

    // Check if the service exists
    if (!service) {
      throw new AppError(404, "Service not found!");
    }

    // Check if the service is deleted
    if (service.isDeleted) {
      throw new AppError(400, "Unable to book, service is deleted");
    }

    // ------------------------------------------------------------
    // 3. Validate Slot Exists and Is Available
    // ------------------------------------------------------------
    const isSlotExists = await SlotModel.findById(payload.slot);

    // Check if the slot exists
    if (!isSlotExists) {
      throw new AppError(404, "Slot not found!");
    }

    // Check if the slot is already booked
    if (isSlotExists.isBooked === "booked") {
      throw new AppError(404, "Slot is already booked!");
    }

    // ------------------------------------------------------------
    // 4. Create Booking and Update Slot Status in a Transaction
    // ------------------------------------------------------------
    // Create the booking (transaction-1)
    const [booking] = await BookingModel.create(
      [{ ...payload, customer: customerId }],
      { session }
    );

    // Update the slot's status to 'booked' (transaction-2)
    await SlotModel.findByIdAndUpdate(
      payload.slot,
      { isBooked: "booked" },
      { new: true, session }
    );

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return booking;
  } catch (err) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};
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

const getAllBookingsFromDB = async () => {
  // ------------------------------------------------------------
  // 1. Get All Bookings with Populated Fields
  // ------------------------------------------------------------
  const result = await BookingModel.find()
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

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

const getUserBookingsFromDB = async (user: JwtPayload) => {
  // ------------------------------------------------------------
  // 1. Find the User by Email
  // ------------------------------------------------------------
  const customer = await UserModel.findOne({ email: user?.userEmail });
  const customerId = customer?._id;

  // ------------------------------------------------------------
  // 2. Get the User's Bookings with Populated Fields
  // ------------------------------------------------------------
  const result = await BookingModel.find({ customer: customerId })
    .populate("customer")
    .populate("service")
    .populate("slot");

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};

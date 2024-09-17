/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import mongoose from "mongoose";

/**
const createBookingIntoDB = async (payload: TBooking, user?: JwtPayload) => {
  const isCustomerExists = await UserModel.findById(payload?.customer);
  if (!isCustomerExists) {
    throw new AppError(404, "Customer not found!");
  }
  const serviceId: any = payload?.service;
  const service = await Service.isServiceExists(serviceId);
  if (!service) {
    throw new AppError(404, "Service not found!");
  }
  if (service.isDeleted) {
    throw new AppError(400, "Unable to book, service is deleted");
  }
  const isSlotExists = await SlotModel.findById(payload.slot);
  if (!isSlotExists) {
    throw new AppError(404, "Slot not found!");
  }
  if (isSlotExists.isBooked === "booked") {
    throw new AppError(404, "Slot is booked!");
  }

  // const result = await BookingModel.create(payload);

  const result = (
    await (
      await (await BookingModel.create(payload)).populate("customer")
    ).populate("service")
  ).populate("slot");

  return result;
};
 */


/**
 * Creates a booking document in the database. The booking payload must contain
 * a customerId which is the ObjectId of an existing user document. The service
 * and slot specified in the payload must exist in the database and the slot
 * must be available (i.e. isBooked is not equal to "booked").
 *
 * This function is transactional, meaning that it will be retried if a
 * transaction fails due to a database error. If the transaction fails for any
 * other reason, the error is propagated up the call stack.
 *
 * @param {TBooking} payload - The booking payload.
 * @param {JwtPayload} user - The user who is booking the service.
 * @returns {Promise<TBooking>} The created booking document.
 * @throws {AppError} If the user, service, or slot does not exist, or if the
 *   slot is already booked.
 */

const createBookingIntoDB = async (payload: TBooking, user: JwtPayload) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //find user from db
    const customer = await UserModel.findOne({ email: user?.userEmail });
    const customerId = customer?._id;
    //check user is exists or not
    if (!customer) {
      throw new AppError(404, "Customer not found");
    }
    //check is service exists or not
    const serviceId: any = payload?.service;
    const service = await Service.isServiceExists(serviceId);
    if (!service) {
      throw new AppError(404, "Service not found!");
    }
    // check service deleted or not
    if (service.isDeleted) {
      throw new AppError(400, "Unable to book, service is deleted");
    }
    //check slots exists or not
    const isSlotExists = await SlotModel.findById(payload.slot);
    if (!isSlotExists) {
      throw new AppError(404, "Slot not found!");
    }
    //check slots is booked or available
    if (isSlotExists.isBooked === "booked") {
      throw new AppError(404, "Slot is already booked!");
    }
    //creating booking- transaction-1
    const [booking] = await BookingModel.create(
      [{ ...payload, customer: customerId }],
      { session }
    );
    // Populate the booking
    (await (await booking.populate("customer")).populate("service")).populate(
      "slot"
    );
    //updating slot status: transaction-2
    await isSlotExists.updateOne(
      { isBooked: "booked" },
      { session }
    );
    await session.commitTransaction();
    await session.endSession();
    return booking;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find()
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

const getUserBookingsFromDB = async (user: JwtPayload) => {
  const customer = await UserModel.findOne({ email: user?.userEmail });
  const customerId = customer?._id;
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

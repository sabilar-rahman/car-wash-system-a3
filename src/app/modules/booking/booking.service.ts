/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
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

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find()
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};

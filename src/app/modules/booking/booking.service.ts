/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";
import { ICarServiceBookingPayload, TBooking} from "./booking.interface";
import { BookingModel } from "./booking.model";
import mongoose from "mongoose";
import httpStatus from "http-status";

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

/*

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

*/


const createBookingIntoDB = async (payload: TBooking, user: JwtPayload) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //find user from db
    const customer = await UserModel.findOne({ email: user?.userEmail })
    const customerId = customer?._id
    //check user is exists or not
    if (!customer) {
      throw new AppError(404, 'Customer not found')
    }
    //check is service exists or not
    const serviceId: any = payload?.service
    const service = await Service.isServiceExists(serviceId)
    if (!service) {
      throw new AppError(404, 'Service not found!')
    }
    // check service deleted or not
    if (service.isDeleted) {
      throw new AppError(400, 'Unable to book, service is deleted')
    }
    //check slots exists or not
    const isSlotExists = await SlotModel.findById(payload.slot)
    if (!isSlotExists) {
      throw new AppError(404, 'Slot not found!')
    }
    //check slots is booked or available
    if (isSlotExists.isBooked === 'booked') {
      throw new AppError(404, 'Slot is already booked!')
    }
    //creating booking- transaction-1
    const [booking] = await BookingModel.create(
      [{ ...payload, customer: customerId }],
      { session },
    )

    //updating slot status: transaction-2
    await SlotModel.findByIdAndUpdate(
      payload.slot,
      { isBooked: 'booked' },
      { new: true, session },
    )

    await session.commitTransaction()
    await session.endSession()
    return booking
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }
}


// const createBookingIntoDB = async (
//   payload: ICarServiceBookingPayload,
//   email: string,
// ) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     // Find the customer by email
//     const customer = await UserModel.findOne({ email });
//     if (!customer) {
//       throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
//     }

//     // Find the car service by ID
//     const isCarServiceExisting = await Service.findById(
//       payload.serviceId,
//     ).session(session);
//     if (!isCarServiceExisting) {
//       throw new AppError(httpStatus.NOT_FOUND, "Service is not found");
//     }

//     // Find the car booking slot by ID
//     const isCarBookingSlotExisting = await SlotModel.findById(
//       payload.slotId,
//     ).session(session);
//     if (!isCarBookingSlotExisting) {
//       throw new AppError(httpStatus.NOT_FOUND, "Slot is not found");
//     }

//     // Check if the slot is available
//     if (isCarBookingSlotExisting.isBooked === "available") {
//       // Update the slot to booked
//       await SlotModel.findByIdAndUpdate(
//         payload.slotId,
//         { isBooked: "booked" },
//         { new: true, runValidators: true, session },
//       );
//     } else {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         `Slot is already ${isCarBookingSlotExisting.isBooked}`,
//       );
//     }

//     // Create the car service booking
//     const result = await BookingModel.create(
//       [
//         {
//           customer: customer._id,
//           service: payload.serviceId,
//           slot: payload.slotId,
//           vehicleType: payload.vehicleType,
//           vehicleBrand: payload.vehicleBrand,
//           vehicleModel: payload.vehicleModel,
//           manufacturingYear: payload.manufacturingYear,
//           registrationPlate: payload.registrationPlate,
//         },
//       ],
//       {
//         session,
//       },
//     );

//     // Populate the result with related data
//     const populateResult = await BookingModel.findById(result[0]._id)
//       .populate("customer")
//       .populate("service")
//       .populate("slot")
//       .session(session);

//     // Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     return populateResult;
//   } catch (error) {
//     // Abort the transaction in case of an error
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };





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

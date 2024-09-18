/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import buildQuery from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";
import { GenerateTimeSlots } from "./slot.utils";

/**
 * Second CODE
 const createSlotServiceIntoDB = async (payload: TSlot) => {
  const { startTime, endTime, date, service } = payload;
  const serviceId: any = payload?.service;
  const serviceInfo = await Service.isServiceExists(serviceId);
  //   check service available or not
  if (!serviceInfo) {
    throw new AppError(404, "Service not found!");
  }
  //check service is deleted or not
  if (serviceInfo.isDeleted) {
    throw new AppError(400, "Can't create slots, service deleted!");
  }

  const serviceDuration = 60;
  // convert to minutes -> ["9", "30"][0,1]*60
  const startMinutes =
    parseInt(startTime.split(":")[0]) * serviceDuration +
    parseInt(startTime.split(":")[1]);
  const endMinutes =
    parseInt(endTime.split(":")[0]) * serviceDuration +
    parseInt(endTime.split(":")[1]);
  // calculate total duration
  const totalDuration = endMinutes - startMinutes;
  //   calculate number of slots
  const numberOfSlots = totalDuration / serviceDuration;

  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    //convert slot start time and end time by iteration value
    const slotStartTime = startMinutes + i * serviceDuration;
    const slotEndTime = slotStartTime + serviceDuration;

    const startHours = Math.floor(slotStartTime / 60)
      .toString()
      .padStart(2, "0");
    const startMins = (slotStartTime % 60).toString().padStart(2, "0");
    const endHours = Math.floor(slotEndTime / 60)
      .toString()
      .padStart(2, "0");
    const endMins = (slotEndTime % 60).toString().padStart(2, "0");
    //push object to the slots
    slots.push({
      service,
      date,
      startTime: `${startHours}:${startMins}`,
      endTime: `${endHours}:${endMins}`,
      isBooked: "available",
    });
  }

  const result = await SlotModel.create(payload);
  return result;
};

 * 
 */

/*
const getAllSlotServiceFromDB = async () => {
  const result = await SlotModel.find({ isBooked: "available" });
  return !result.length ? "No slots available at this moment!" : result;
};
*/

/*
const getAllSlotServiceFromDB = async () => {
  const result = await SlotModel.find({ isBooked: "available" })
  const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
    const searchAbleFields = ['date']
    const result = await buildQuery(
      SlotModel.find({ isBooked: 'available' }).populate('service'),
      query,
      searchAbleFields,
    )


  if (result.length === 0) {
    return "No slots available at this moment!";
  }

  return result;
};
*/

// ────────────────────────────────────────────────────────────────────────────────
// SERVICE FOR CREATING A SLOT
// This service handles the creation of time slots and saves them to the database
// ────────────────────────────────────────────────────────────────────────────────
const createSlotServiceIntoDB = async (payload: TSlot) => {
  // 1. Check if the referenced service exists in the database
  const isCarServiceExisting = await Service.findById(payload.service);

  // 2. Throw an error if the service does not exist
  if (!isCarServiceExisting) {
    throw new AppError(httpStatus.NOT_FOUND, "Service does not exist");
  }

  // 3. Extract the duration of the service (in minutes)
  const duration = isCarServiceExisting.duration;

  try {
    // 4. Generate time slots based on the provided payload and service duration
    const slots = await GenerateTimeSlots(payload, duration);

    // 5. If no slots are generated, throw an error indicating no data was found
    if (slots.length === 0) {
      throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
    }

    // 6. Save the generated slots to the database in bulk
    const result = await SlotModel.insertMany(slots);

    // 7. Return the saved slot records
    return result;
  } catch (error: any) {
    // 8. Catch any errors from the slot generation process and handle them appropriately
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
// SERVICE FOR RETRIEVING ALL AVAILABLE SLOTS
// This service fetches all available time slots based on query parameters
// ────────────────────────────────────────────────────────────────────────────────
const getAllSlotServiceFromDB = async (query: Record<string, unknown>) => {
  // 1. Define fields that can be used for searching
  const searchAbleFields = ["date"];

  // 2. Build and execute the query to retrieve available slots
  const result = await buildQuery(
    SlotModel.find({ isBooked: "available" }).populate("service"),
    query,
    searchAbleFields
  );

  // 3. Return a message if no slots are found
  if (result.length === 0) {
    return "No slots available at this moment!";
  }

  // 4. Return the retrieved slots
  return result;
};


export const SlotServices = {
  createSlotServiceIntoDB,
  getAllSlotServiceFromDB,
};

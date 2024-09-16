/* eslint-disable @typescript-eslint/no-explicit-any */
import buildQuery from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";

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

const getAllSlotServiceFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFields = ["date"];
  const result = await buildQuery(
    SlotModel.find({ isBooked: "available" }).populate("service"),
    query,
    searchAbleFields
  );

  if (result.length === 0) {
    return "No slots available at this moment!";
  }

  return result;
};

export const SlotServices = {
  createSlotServiceIntoDB,
  getAllSlotServiceFromDB,
};

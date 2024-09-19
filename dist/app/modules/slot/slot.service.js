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
exports.SlotServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("./slot.model");
const slot_utils_1 = require("./slot.utils");
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
const createSlotServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Check if the referenced service exists in the database
    const isCarServiceExisting = yield service_model_1.Service.findById(payload.service);
    // 2. Throw an error if the service does not exist
    if (!isCarServiceExisting) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service does not exist");
    }
    // 3. Extract the duration of the service (in minutes)
    const duration = isCarServiceExisting.duration;
    try {
        // 4. Generate time slots based on the provided payload and service duration
        const slots = yield (0, slot_utils_1.GenerateTimeSlots)(payload, duration);
        // 5. If no slots are generated, throw an error indicating no data was found
        if (slots.length === 0) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found");
        }
        // 6. Save the generated slots to the database in bulk
        const result = yield slot_model_1.SlotModel.insertMany(slots);
        // 7. Return the saved slot records
        return result;
    }
    catch (error) {
        // 8. Catch any errors from the slot generation process and handle them appropriately
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
// ────────────────────────────────────────────────────────────────────────────────
// SERVICE FOR RETRIEVING ALL AVAILABLE SLOTS
// This service fetches all available time slots based on query parameters
// ────────────────────────────────────────────────────────────────────────────────
const getAllSlotServiceFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Define fields that can be used for searching
    const searchAbleFields = ["date"];
    // 2. Build and execute the query to retrieve available slots
    const result = yield (0, queryBuilder_1.default)(slot_model_1.SlotModel.find({ isBooked: "available" }).populate("service"), query, searchAbleFields);
    // 3. Return a message if no slots are found
    if (result.length === 0) {
        return "No slots available at this moment!";
    }
    // 4. Return the retrieved slots
    return result;
});
exports.SlotServices = {
    createSlotServiceIntoDB,
    getAllSlotServiceFromDB,
};

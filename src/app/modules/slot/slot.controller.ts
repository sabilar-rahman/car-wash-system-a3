import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { SlotServices } from "./slot.service";

// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLER FOR CREATING A NEW SLOT
// Handles the creation of a new slot and saves it to the database
// ────────────────────────────────────────────────────────────────────────────────
const createSlot = catchAsync(async (req, res) => {
  // 1. Call the service to create a slot using the data from the request body
  const result = await SlotServices.createSlotServiceIntoDB(req.body);

  // 2. Send a successful response with the created slot details
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot created successfully",
    data: result,
  });
});

// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLER FOR RETRIEVING ALL SLOTS
// Fetches all available slots based on query parameters
// ────────────────────────────────────────────────────────────────────────────────
const getAllSlot = catchAsync(async (req, res) => {
  // 1. Fetch all available slots from the database using query parameters
  const result = await SlotServices.getAllSlotServiceFromDB(req.query);

  // 2. Send a successful response with the retrieved slot data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAllSlot,
};

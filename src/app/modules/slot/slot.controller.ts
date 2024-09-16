import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { SlotServices } from "./slot.service";

// create slot
const createSlot = catchAsync(async (req, res) => {
  const slotBody = req.body;
  const result = await SlotServices.createSlotServiceIntoDB(slotBody);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot created successfully",
    data: result,
  });
});

// get all slots

const getAllSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotServiceFromDB(req.query);
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

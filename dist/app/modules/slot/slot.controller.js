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
exports.SlotController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const slot_service_1 = require("./slot.service");
// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLER FOR CREATING A NEW SLOT
// Handles the creation of a new slot and saves it to the database
// ────────────────────────────────────────────────────────────────────────────────
const createSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Call the service to create a slot using the data from the request body
    const result = yield slot_service_1.SlotServices.createSlotServiceIntoDB(req.body);
    // 2. Send a successful response with the created slot details
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slot created successfully",
        data: result,
    });
}));
// ────────────────────────────────────────────────────────────────────────────────
// CONTROLLER FOR RETRIEVING ALL SLOTS
// Fetches all available slots based on query parameters
// ────────────────────────────────────────────────────────────────────────────────
const getAllSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Fetch all available slots from the database using query parameters
    const result = yield slot_service_1.SlotServices.getAllSlotServiceFromDB(req.query);
    // 2. Send a successful response with the retrieved slot data
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result,
    });
}));
exports.SlotController = {
    createSlot,
    getAllSlot,
};

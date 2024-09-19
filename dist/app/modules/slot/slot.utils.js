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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTimeSlots = void 0;
const slot_model_1 = require("./slot.model");
const generateTimeSlots = (payload, duration) => __awaiter(void 0, void 0, void 0, function* () {
    const slots = [];
    const [startTimeHours, startTimeMinutes] = payload.startTime
        .split(":")
        .map(Number);
    const [endTimeHours, endTimeMinutes] = payload.endTime.split(":").map(Number);
    const totalStartTime = startTimeHours * 60 + startTimeMinutes;
    const totalEndTime = endTimeHours * 60 + endTimeMinutes;
    const totalSlotTime = totalEndTime - totalStartTime;
    const totalSlots = totalSlotTime / duration;
    let currentTime = totalStartTime;
    for (let i = 0; i < totalSlots; i++) {
        const slotStartTime = currentTime;
        const slotEndTime = currentTime + duration;
        const startHour = String(Math.floor(slotStartTime / 60)).padStart(2, "0");
        const startMinute = String(slotStartTime % 60).padStart(2, "0");
        const endHour = String(Math.floor(slotEndTime / 60)).padStart(2, "0");
        const endMinute = String(slotEndTime % 60).padStart(2, "0");
        const startTime = `${startHour}:${startMinute}`;
        const endTime = `${endHour}:${endMinute}`;
        // Check if a slot with the same service, date, and time exists
        const existingSlot = yield slot_model_1.SlotModel.findOne({
            service: payload.service,
            date: payload.date,
            startTime: startTime,
            endTime: endTime,
        });
        if (existingSlot) {
            if (existingSlot.isBooked === "available" ||
                existingSlot.isBooked === "canceled") {
                throw new Error(`This slot service at ${startTime} to ${endTime} is ${existingSlot.isBooked === "available" ? "already" : ""} ${existingSlot.isBooked}`);
            }
        }
        slots.push({
            service: payload.service,
            date: payload.date,
            startTime: startTime,
            endTime: endTime,
        });
        currentTime += duration;
    }
    return slots;
});
exports.GenerateTimeSlots = generateTimeSlots;

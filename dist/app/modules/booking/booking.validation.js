"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const bookingCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        customer: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
        serviceId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/),
        slotId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/),
        vehicleType: zod_1.z.enum(booking_constant_1.vTypesEnum),
        vehicleModel: zod_1.z.string().min(1),
        manufacturingYear: zod_1.z.number(),
        registrationPlate: zod_1.z.string().min(1),
    }),
});
exports.BookingValidation = {
    bookingCreateValidationSchema,
};

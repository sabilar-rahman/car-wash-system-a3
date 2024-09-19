"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'service',
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'slot',
    },
    vehicleType: {
        type: String,
        enum: booking_constant_1.vTypesEnum,
        required: true,
    },
    vehicleBrand: {
        type: String,
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: Number,
        required: true,
    },
    registrationPlate: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
bookingSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.customer.role;
    return obj;
};
exports.BookingModel = (0, mongoose_1.model)('booking', bookingSchema);

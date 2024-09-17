import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";
import { vTypesEnum } from "./booking.constant";

const bookingSchema = new Schema<TBooking>(
    {
      customer: {
        type: Schema.Types.ObjectId,
       
        ref: 'user',
      },
      service: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'service',
      },
      slot: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'slot',
      },
      vehicleType: {
        type: String,
        enum: vTypesEnum,
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
    },
    { timestamps: true },
  )


  bookingSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.customer.role
    return obj
  }




  export const BookingModel = model<TBooking>('booking', bookingSchema);
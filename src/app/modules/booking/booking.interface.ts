import { Types } from "mongoose";

export type TVehicleTypes =
  | "car"
  | "truck"
  | "SUV"
  | "van"
  | "motorcycle"
  | "bus"
  | "electricVehicle"
  | "hybridVehicle"
  | "bicycle"
  | "tractor";

export type TBooking = {
  customer?: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: TVehicleTypes;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  createdAt?: Date
  updatedAt?: Date
};

// export interface TTBooking extends Document, TBooking {}

// export interface ICarServiceBookingPayload
//   extends Omit<TBooking, "service" | "slot"> {
//   serviceId: string;
//   slotId: string;
// }
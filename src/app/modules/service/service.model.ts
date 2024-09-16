import mongoose, { Schema } from "mongoose";
import { ServiceModel, TService } from "./service.interface";

const ServiceSchema = new Schema<TService, ServiceModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//isServiceExists statics method
ServiceSchema.statics.isServiceExists = async function (id: string) {
  return await Service.findById(id)
}


export const Service = mongoose.model<TService, ServiceModel>("service", ServiceSchema);

// Create a new service

import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import status from "http-status";

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

// Retrieve Only Non-Deleted Documents: Always query with { isDeleted: false } to avoid showing deleted items.
// get all services
const getAllServicesFromDB = async () => {
  const result = await Service.find({ isDeleted: false });
  return result;
};

//get single service
const getSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

const updateSingleServiceFromDB = async (
  id: string,
  payload: Partial<TService>
) => {
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

/*
const deleteSingleServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndDelete(id);

  // if (!result) {
  //   throw new Error("Service not found");
  // }

  // check if service exists
  if (!result) {
    throw new AppError(status.NOT_FOUND, "Service not found!");
  }

  // check if service is deleted
  if (result.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Service already deleted!");
  }


  return result;
};

*/

/*soft delete approach. In this system, 
instead of physically deleting a document from the database,
you're marking it as deleted by setting isDeleted: true.
  */
const deleteSingleServiceFromDB = async (id: string) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new AppError(status.NOT_FOUND, "Service not found!");
  }

  if (service.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Service already deleted!");
  }

  // Mark the service as deleted (soft delete)
  service.isDeleted = true;
  await service.save();

  return service;
};

export const ServiceOfServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateSingleServiceFromDB,
  deleteSingleServiceFromDB,
};

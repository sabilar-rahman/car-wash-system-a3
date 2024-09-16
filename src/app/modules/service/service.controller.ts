import { Request, Response } from "express";
import { ServiceOfServices } from "./service.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

// create service
const createService = catchAsync(async (req: Request, res: Response) => {
  const serviceBody = req.body;
  const result = await ServiceOfServices.createServiceIntoDB(serviceBody);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

// get all services

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceOfServices.getAllServicesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services fetched successfully",
    data: result,
  });
});

// get single service

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceOfServices.getSingleServiceFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service fetched successfully",
    data: result,
  });
});

// Update Single Service

const updateSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const serviceBody = req.body;
  const result = await ServiceOfServices.updateSingleServiceFromDB(id, serviceBody);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

// Delete Single Service
const deleteSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceOfServices.deleteSingleServiceFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
})




export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  updateSingleService,
  deleteSingleService
};

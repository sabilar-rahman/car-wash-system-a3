import { Request, Response } from "express";
import { ServiceOfServices } from "./service.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

const createService = catchAsync(async (req: Request, res: Response) => {
  const serviceBody=req.body
  const result = await ServiceOfServices.createServiceIntoDB(serviceBody);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

export const ServiceController = {
  createService,
};

"use strict";
// Create a new service
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
exports.ServiceOfServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("./service.model");
const http_status_1 = __importDefault(require("http-status"));
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.create(payload);
    return result;
});
// Retrieve Only Non-Deleted Documents: Always query with { isDeleted: false } to avoid showing deleted items.
// get all services
const getAllServicesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.find({ isDeleted: false });
    return result;
});
//get single service
const getSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById(id);
    return result;
});
const updateSingleServiceFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
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
const deleteSingleServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(id);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found!");
    }
    if (service.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service already deleted!");
    }
    // Mark the service as deleted (soft delete)
    service.isDeleted = true;
    yield service.save();
    return service;
});
exports.ServiceOfServices = {
    createServiceIntoDB,
    getAllServicesFromDB,
    getSingleServiceFromDB,
    updateSingleServiceFromDB,
    deleteSingleServiceFromDB,
};

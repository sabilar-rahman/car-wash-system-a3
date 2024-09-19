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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
// ============================================================
// Auth Controllers
// ============================================================
/**
 * Registers a new user.
 *
 * This controller receives the user data from the request body, registers
 * the user in the database, and sends a success response.
 *
 * Key functionalities:
 * - Call service to register the user in the database
 * - Return a success message and the created user data

 */
const registeredUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.registeredUserIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User registered successfully",
        data: result,
    });
}));
/**
 * Logs in an existing user.
 *
 * This controller receives the login credentials from the request body,
 * logs in the user by generating an access token, and sends it in the response.
 *
 * Key functionalities:
 * - Call service to authenticate the user and generate an access token
 * - Return a success message with the access token and user data
 *
 */
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ------------------------------------------------------------
    // 1. Authenticate User and Generate Access Token
    // ------------------------------------------------------------
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    const { accessToken, user } = result;
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully!",
        token: accessToken,
        data: user,
    });
}));
// ============================================================
// Export Auth Controllers
// ============================================================
exports.AuthControllers = {
    registeredUser,
    loginUser,
};

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
exports.AuthServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// ============================================================
// Authentication Services
// ============================================================
/**
 * Registers a new user into the database.
 *
 * This function accepts user data and creates a new user document
 * in the database using the `UserModel`.
 *
 * Key functionalities:
 * - Create a new user in the database
 *
 * @param {TUser} payload - The user data for registration
 * @returns {Promise<User>} - The newly created user document
 */
const registeredUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(payload);
    return result;
});
/**
 * Authenticates a user and generates an access token.
 *
 * This function verifies the user's credentials by checking if the
 * user exists and if the provided password matches the stored hash.
 * If authentication succeeds, it generates a JWT access token.
 *
 * Key functionalities:
 * - Find the user by email
 * - Verify the password
 * - Generate an access token
 *
 * @param {TLoginUser} payload - The login credentials (email and password)
 * @returns {Promise<{ accessToken: string, user: User }>} - The access token and user info
 */
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // ------------------------------------------------------------
    // 1. Find User by Email
    // ------------------------------------------------------------
    const user = yield user_model_1.UserModel.findOne({ email: payload.email }).select("+password");
    // Check if the user exists
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist!");
    }
    // ------------------------------------------------------------
    // 2. Check if Password Matches
    // ------------------------------------------------------------
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    // If password does not match, throw an error
    if (!isPasswordMatched) {
        throw new AppError_1.default(400, "Password does not match!");
    }
    // ------------------------------------------------------------
    // 3. Generate JWT Access Token
    // ------------------------------------------------------------
    const jwtPayload = {
        userEmail: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    // Generate the JWT access token with expiration
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    // ------------------------------------------------------------
    // 4. Return Access Token and User Info
    // ------------------------------------------------------------
    return {
        accessToken: accessToken,
        user,
    };
});
exports.AuthServices = {
    registeredUserIntoDB,
    loginUser,
};

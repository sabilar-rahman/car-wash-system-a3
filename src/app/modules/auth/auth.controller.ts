import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { AuthServices } from "./auth.service";

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

const registeredUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registeredUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

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

const loginUser = catchAsync(async (req, res) => {
  // ------------------------------------------------------------
  // 1. Authenticate User and Generate Access Token
  // ------------------------------------------------------------
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, user } = result;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully!",
    token: accessToken,
    data: user,
  });
});

// ============================================================
// Export Auth Controllers
// ============================================================

export const AuthControllers = {
  registeredUser,
  loginUser,
};

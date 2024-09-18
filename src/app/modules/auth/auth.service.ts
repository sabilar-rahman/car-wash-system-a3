import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import status from "http-status";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

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

const registeredUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

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

const loginUser = async (payload: TLoginUser) => {
  // ------------------------------------------------------------
  // 1. Find User by Email
  // ------------------------------------------------------------
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );

  // Check if the user exists
  if (!user) {
    throw new AppError(status.NOT_FOUND, "User does not exist!");
  }
  // ------------------------------------------------------------
  // 2. Check if Password Matches
  // ------------------------------------------------------------
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );
  // If password does not match, throw an error
  if (!isPasswordMatched) {
    throw new AppError(400, "Password does not match!");
  }
  // ------------------------------------------------------------
  // 3. Generate JWT Access Token
  // ------------------------------------------------------------
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };

  // Generate the JWT access token with expiration
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  // ------------------------------------------------------------
  // 4. Return Access Token and User Info
  // ------------------------------------------------------------
  return {
    accessToken: accessToken,
    user,
  };
};

export const AuthServices = {
  registeredUserIntoDB,
  loginUser,
};

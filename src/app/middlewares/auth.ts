import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import catchAsync from "../modules/utils/catchAsync";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";

// ============================================================
// Authentication Middleware
// ============================================================
/**
 * Middleware to authenticate users based on their roles.
 *
 * This function verifies the JWT token provided by the client and checks 
 * if the user has the required role(s) to access the resource.
 *
 * Key functionalities:
 * - Verify JWT token from the Authorization header
 * - Check user role against permitted roles
 * - Attach decoded user information to the request object
 *
 * @param {...TUserRole[]} userRoles - Allowed roles for accessing the route
 * @returns {Function} - Express middleware function for role-based authentication
 */

const auth = (...userRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // ------------------------------------------------------------
    // 1. Extract and Validate JWT Token
    // ------------------------------------------------------------
    const token = req.headers.authorization?.split(" ")[1];
    // Check if token is provided in the Authorization header
    if (!token) {
      throw new AppError(401, "You are not authorized");
    }

    // ------------------------------------------------------------
    // 2. Verify JWT and Decode Payload
    // ------------------------------------------------------------

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    // ------------------------------------------------------------
    // 3. Check if User Role is Authorized
    // ------------------------------------------------------------
    if (userRoles && !userRoles.includes(decoded?.role)) {
      throw new AppError(401, "You are not authorized");
    }

    // ------------------------------------------------------------
    // 4. Attach Decoded User Info to Request Object
    // ------------------------------------------------------------
    req.user = decoded as JwtPayload;
    // ------------------------------------------------------------
    // 5. Proceed to Next Middleware or Controller
    // ------------------------------------------------------------
    next();
  });
};

export default auth;

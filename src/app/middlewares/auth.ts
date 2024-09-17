import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import catchAsync from "../modules/utils/catchAsync";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...userRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    //check is token came from client
    if (!token) {
      throw new AppError(401, "You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    //check user role
    if (userRoles && !userRoles.includes(decoded?.role)) {
      throw new AppError(401, "You are not authorized");
    }

    //attach user to req object
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;

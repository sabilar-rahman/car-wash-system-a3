import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import status from "http-status";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const registeredUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

// login user service

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email }); // check user exists
  if (!user) {
    throw new AppError(status.NOT_FOUND, "User does not exists!");
  }
  // check password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(400, "Password do not matched!");
  }
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "2d",
  });
  return {
    accessToken,
    user,
  };
};

export const AuthServices = {
  registeredUserIntoDB,
  loginUser,
};

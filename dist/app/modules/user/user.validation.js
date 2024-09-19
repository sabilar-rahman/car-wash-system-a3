"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const roleEnum = zod_1.z.enum(user_constant_1.userRoleEnum);
const userCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
        phone: zod_1.z.string().min(1, { message: "Phone number is required" }),
        role: roleEnum,
        address: zod_1.z.string().min(1, { message: "Address is required" }),
    }),
});
exports.UserValidation = {
    userCreateValidationSchema,
};

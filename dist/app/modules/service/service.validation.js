"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
// Define the Zod schema for validating the service data
const serviceCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"), // Name must be a non-empty string
        description: zod_1.z.string().min(1, "Description is required"), // Description must be a non-empty string
        price: zod_1.z.number().positive("Price must be a positive number"), // Price must be a positive number
        duration: zod_1.z.number().positive("Duration must be a positive number"), // Duration must be a positive number (in minutes)
        isDeleted: zod_1.z.boolean().optional().default(false), // Optional field, defaults to false
    }),
});
const serviceUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        description: zod_1.z.string().min(1, 'Description is required').optional(),
        price: zod_1.z.number().min(0, 'Price must be a positive number').optional(),
        duration: zod_1.z
            .number()
            .min(0, 'Duration must be a positive number')
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.serviceValidation = {
    serviceCreateValidationSchema,
    serviceUpdateValidationSchema
};

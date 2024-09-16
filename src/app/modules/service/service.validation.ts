import { z } from "zod";

// Define the Zod schema for validating the service data
 const serviceCreateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"), // Name must be a non-empty string
    description: z.string().min(1, "Description is required"), // Description must be a non-empty string
    price: z.number().positive("Price must be a positive number"), // Price must be a positive number
    duration: z.number().positive("Duration must be a positive number"), // Duration must be a positive number (in minutes)
    isDeleted: z.boolean().optional().default(false), // Optional field, defaults to false
  }),
});


const serviceUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    duration: z
      .number()
      .min(0, 'Duration must be a positive number')
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
})




export const serviceValidation ={
  serviceCreateValidationSchema,
  serviceUpdateValidationSchema
} ;


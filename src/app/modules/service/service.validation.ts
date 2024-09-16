import { z } from "zod";

// Define the Zod schema for validating the service data
 const serviceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"), // Name must be a non-empty string
    description: z.string().min(1, "Description is required"), // Description must be a non-empty string
    price: z.number().positive("Price must be a positive number"), // Price must be a positive number
    duration: z.number().positive("Duration must be a positive number"), // Duration must be a positive number (in minutes)
    isDeleted: z.boolean().optional().default(false), // Optional field, defaults to false
  }),
});

// const serviceValidationSchema = z.object({
  
//     name: z.string().min(1, "Name is required"), // Name must be a non-empty string
//     description: z.string().min(1, "Description is required"), // Description must be a non-empty string
//     price: z.number().positive("Price must be a positive number"), // Price must be a positive number
//     duration: z.number().positive("Duration must be a positive number"), // Duration must be a positive number (in minutes)
//     isDeleted: z.boolean().optional().default(false), // Optional field, defaults to false
 
// });


export default serviceValidationSchema ;


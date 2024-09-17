import { z } from 'zod'
import { vTypesEnum } from "./booking.constant";

const bookingCreateValidationSchema = z.object({
    body: z.object({
      customer: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      service: z.string().regex(/^[0-9a-fA-F]{24}$/),
      slot: z.string().regex(/^[0-9a-fA-F]{24}$/),
      vehicleType: z.enum(vTypesEnum),
      vehicleModel: z.string().min(1),
      manufacturingYear: z.number(),
      registrationPlate: z.string().min(1),
    }),
  })


  export const BookingValidation = {
    bookingCreateValidationSchema,
  }
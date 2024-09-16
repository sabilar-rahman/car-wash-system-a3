import { z } from 'zod'


const slotCreateValidationSchema = z.object({
  body: z.object({
    service: z.string().refine(value => /^[0-9a-fA-F]{24}$/.test(value), {
      message: 'Invalid ObjectId',
    }),
    date: z.string().min(1, 'Date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    isBooked: z.enum(['available', 'booked', 'canceled']).optional(),
  }),
})

export const SlotValidations = {
  slotCreateValidationSchema,
}
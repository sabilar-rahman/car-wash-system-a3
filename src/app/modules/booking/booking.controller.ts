import catchAsync from "../utils/catchAsync"
import sendResponse from "../utils/sendResponse"
import { BookingServices } from "./booking.service"

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBookingIntoDB(req.body)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Booking successful',
      data: result,
    })
  })


  const getAllBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB()
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All bookings retrieved successfully',
      data: result,
    })
  })
  
  export const BookingController = {
    createBooking,
    getAllBooking
  }
import catchAsync from "../utils/catchAsync"
import sendResponse from "../utils/sendResponse"
import { AuthServices } from "./auth.service"


const registeredUser = catchAsync(async (req, res) => {
    const result = await AuthServices.registeredUserIntoDB(req.body)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User registered successfully',
      data: result,
    })
  })
  
  export const AuthControllers = {
    registeredUser,
  }
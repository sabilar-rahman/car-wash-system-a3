import { Router } from "express"
import ValidateRequest from "../../middlewares/ValidateRequest"
import { BookingValidation } from "./booking.validation"
import { BookingController} from "./booking.controller"

const router = Router()

router.post(
  '/',
  ValidateRequest(BookingValidation.bookingCreateValidationSchema),
  BookingController.createBooking,
)


router.get('/', BookingController.getAllBooking)

export const BookingRoutes = router
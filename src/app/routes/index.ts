import { Router } from "express";
import { ServiceRoutes } from "../modules/service/service.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { AdminBookingRoutes, BookingRoutes, UserBookingRoutes, UserGetBookingRoutes, UserPostBookingRoutes } from "../modules/booking/booking.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
 
  {
    path: "/services/slots",
    route: SlotRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/bookings",
    route: UserPostBookingRoutes,
  },
  {
    path: "/my-bookings",
    route: UserGetBookingRoutes,
  },

  {
    path: "/bookings",
    route: AdminBookingRoutes,
  },
  // {
  //   path: "/my-bookings",
  //   route: BookingRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

import { Router } from "express";
import { ServiceRoutes } from "../modules/service/service.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/service",
    route: ServiceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

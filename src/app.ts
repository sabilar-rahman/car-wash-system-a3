import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandelers";
import notFound from "./app/middlewares/notfound";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

const app: Application = express();
app.options("*", cors(corsConfig));
app.use(cors(corsConfig));

// Add body-parser middleware to handle JSON request bodies
app.use(express.json()); // This will parse incoming JSON requests
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!, This is car washing system.");
});

// application routes
app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;

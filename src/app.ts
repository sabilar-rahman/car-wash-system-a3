import express, { Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandelers";
import notFound from "./app/middlewares/notfound";

const app = express();

// Add body-parser middleware to handle JSON request bodies
app.use(express.json()); // This will parse incoming JSON requests

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!, This is car washing system.");
});

// application routes
app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;

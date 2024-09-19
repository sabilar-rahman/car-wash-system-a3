"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorhandelers_1 = __importDefault(require("./app/middlewares/globalErrorhandelers"));
const notfound_1 = __importDefault(require("./app/middlewares/notfound"));
const app = (0, express_1.default)();
// Add body-parser middleware to handle JSON request bodies
app.use(express_1.default.json()); // This will parse incoming JSON requests
app.get("/", (req, res) => {
    res.send("Hello!, This is car washing system.");
});
// application routes
app.use("/api", routes_1.default);
app.use(globalErrorhandelers_1.default);
app.use(notfound_1.default);
exports.default = app;

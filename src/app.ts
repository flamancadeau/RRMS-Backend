import express from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Security
app.use(helmet());
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Health check
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "RRMS Backend",
  });
});

// Error handler — MUST be last
app.use(errorHandler);

export default app;
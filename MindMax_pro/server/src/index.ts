import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { router as apiRouter } from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", apiRouter);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});



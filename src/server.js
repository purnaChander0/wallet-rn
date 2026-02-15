import express from "express";
import "dotenv/config";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import TransRouter from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

const app = express();

if (process.env.NODE_ENV === "production") job.start();

const PORT = process.env.PORT || 5232;

//middleware
app.use(express.json());
app.use(rateLimiter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.use("/api/transactions", TransRouter);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running in ${PORT}`);
  });
});

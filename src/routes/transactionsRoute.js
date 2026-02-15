import express from "express";
import { sql } from "../config/db.js";
import {
  getTransactionsByUserId,
  createTransaction,
  getTransactionSummary,
  deleteTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.delete("/:id", deleteTransaction);

router.post("/", createTransaction);

router.get("/summary/:userId", getTransactionSummary);

router.get("/", async (req, res) => {
  try {
    const transactions = await sql` select * from transactions
                    `;
    res.status(200).json({ data: transactions });
  } catch (err) {
    console.log("Error in fetching the transactions ", err);
    res.status(500).json({ message: "Something went wrong " });
  }
});
export default router;

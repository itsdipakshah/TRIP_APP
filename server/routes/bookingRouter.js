import express from "express";
import { authorization } from "../middlewares/auth.js";

import { addBooking, deleteBooking, getBookings, updateBooking } from "../controllers/bookingController.js"

const router = express.Router();

router.get("/bookings",authorization, getBookings);
router.post("/bookings", authorization, addBooking);
router.patch("/booking/:id", authorization, updateBooking);
router.delete("/booking/:id", authorization, deleteBooking);

export default router;
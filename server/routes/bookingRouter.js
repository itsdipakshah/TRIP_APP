import express from "express";

import { addBooking, deleteBooking, getBookings, updateBooking } from "../controllers/bookingController.js"

const router = express.Router();

router.get("/bookings", getBookings);
router.post("/bookings", addBooking);
router.patch("/booking/:id", updateBooking);
router.delete("/booking/:id", deleteBooking);

export default router;
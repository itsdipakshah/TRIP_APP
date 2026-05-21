import express from "express";
import { authorization } from "../middlewares/auth.js";

import { addBooking, deleteBooking, getBookings,getBookingById,getMybookings, updateBooking } from "../controllers/bookingController.js"

const router = express.Router();

router.get("/bookings",authorization, getBookings);
router.get("/bookings/me",authorization, getMybookings);
router.get("/bookings/:id",authorization, getBookingById);
router.post("/bookings", authorization, addBooking);
router.patch("/bookings/:id", authorization, updateBooking);
router.delete("/bookings/:id", authorization, deleteBooking);

export default router;
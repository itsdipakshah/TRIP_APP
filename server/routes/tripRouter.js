import express from 'express';

import { addTrip, deleteTrip, getTrips,getTripById, updateTrip } from "../controllers/tripController.js";
import { authorization } from '../middlewares/auth.js';
const router = express.Router();

router.get("/trips",authorization, getTrips);
router.post("/trips",authorization, addTrip);
router.get("/trips/:id",authorization, getTripById);
router.patch("/trips/:id",authorization, updateTrip);
router.delete("/trips/:id",authorization, deleteTrip);

export default router;
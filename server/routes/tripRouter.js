import express from 'express';

import { addTrip, deleteTrip, getTrips, updateTrip } from "../controllers/tripController.js";
const router = express.Router();

router.get("/trips", getTrips);
router.post("/trips", addTrip);
router.patch("/trips/:id", updateTrip);
router.delete("/trips/:id", deleteTrip);

export default router;
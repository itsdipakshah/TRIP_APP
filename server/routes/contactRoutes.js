import express from 'express';

import { addContact, deleteContact, getContacts, updateContactStatus } from "../controllers/contactController.js";

const router = express.Router();

router.get("/contacts", getContacts);
router.post("/contacts", addContact);
router.put("/contacts/:id", updateContactStatus);
router.delete("/contacts/:id", deleteContact);

export default router ;
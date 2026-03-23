import express from 'express';


import { getSubscribers ,addSubscriber , deleteSubscriber, updateSubsbcriberStatus } from '../controllers/subscriberController.js';


const router = express.Router();

router.get('/subscribers', getSubscribers);
router.post('/subscribers', addSubscriber);
router.put('/subscribers/:id', updateSubsbcriberStatus);
router.delete('/subscribers/:id', deleteSubscriber);


export default router;
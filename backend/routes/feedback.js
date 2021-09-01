import express from 'express';
const router = express.Router();

import { list, add } from './../controllers/feedback.controller.js';

router.get('/feedbacks', list);

router.post('/feedback/add', add);

module.exports = router;
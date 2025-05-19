import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/reviews/:reviewId', async (req, res) => {
  try {
    const list = await Feedback.find({ reviewId: req.params.reviewId });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const list = await Feedback.find({ employeeId: req.params.userId });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
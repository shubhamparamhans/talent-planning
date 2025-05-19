import express from 'express';
import PerformanceReview from '../models/PerformanceReview.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.employeeId) filter.employeeId = req.query.employeeId;
    if (req.query.reviewCycle) filter.reviewCycle = req.query.reviewCycle;
    const reviews = await PerformanceReview.find(filter);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const review = await PerformanceReview.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/cycles', async (req, res) => {
  try {
    const cycles = await PerformanceReview.distinct('reviewCycle');
    res.json(cycles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await PerformanceReview.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const review = await PerformanceReview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const review = await PerformanceReview.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const reviews = await PerformanceReview.find({ employeeId: req.params.userId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
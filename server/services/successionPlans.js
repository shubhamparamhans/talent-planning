import express from 'express';
import SuccessionPlan from '../models/SuccessionPlan.js';

const router = express.Router();

// List all succession plans
router.get('/', async (req, res) => {
  try {
    const plans = await SuccessionPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new succession plan
router.post('/', async (req, res) => {
  try {
    const plan = await SuccessionPlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get details of a succession plan
router.get('/:id', async (req, res) => {
  try {
    const plan = await SuccessionPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Succession plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a succession plan
router.put('/:id', async (req, res) => {
  try {
    const plan = await SuccessionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ error: 'Succession plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
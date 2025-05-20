import express from 'express';
import CareerDevelopment from '../models/CareerDevelopment.js';

const router = express.Router({ mergeParams: true });

// Get or initialize career development data for a user
router.get('/', async (req, res) => {
  try {
    const record = await CareerDevelopment.findOne({ employeeId: req.params.userId });
    res.json(record || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update career development data for a user
router.put('/', async (req, res) => {
  try {
    const record = await CareerDevelopment.findOneAndUpdate(
      { employeeId: req.params.userId },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
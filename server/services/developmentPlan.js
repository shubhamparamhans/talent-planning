import express from 'express';
import CareerDevelopment from '../models/CareerDevelopment.js';

const router = express.Router({ mergeParams: true });

// Get development plans for a user
router.get('/', async (req, res) => {
  try {
    const record = await CareerDevelopment.findOne({ employeeId: req.params.userId });
    res.json((record && record.developmentPlans) || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update development plans for a user
router.put('/', async (req, res) => {
  try {
    const record = await CareerDevelopment.findOneAndUpdate(
      { employeeId: req.params.userId },
      { developmentPlans: req.body },
      { new: true, upsert: true }
    );
    res.json(record.developmentPlans);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
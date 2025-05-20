import express from 'express';
import SuccessionPlan from '../models/SuccessionPlan.js';

const router = express.Router();

// Get succession plan for a specific role
router.get('/:roleId/succession-plan', async (req, res) => {
  try {
    const plan = await SuccessionPlan.findOne({ roleId: req.params.roleId });
    if (!plan) return res.status(404).json({ error: 'Succession plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
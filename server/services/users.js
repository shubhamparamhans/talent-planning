import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from './auth.js';
import AgentInteraction from '../models/AgentInteraction.js';
import SuccessionPlan from '../models/SuccessionPlan.js';

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/me', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all agent insights for a user
router.get('/:id/agent-insights', async (req, res) => {
  try {
    const insights = await AgentInteraction.find({ employeeId: req.params.id });
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get succession plans where user is a candidate
router.get('/:id/succession-candidates', async (req, res) => {
  try {
    const plans = await SuccessionPlan.find({ 'candidates.employeeId': req.params.id });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
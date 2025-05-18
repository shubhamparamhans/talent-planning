import express from 'express';
import Hierarchy from '../models/Hierarchy.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, managerId, organizationId, level } = req.body;
  try {
    const record = await Hierarchy.create({ userId, managerId, organizationId, level });
    res.json(record);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:organizationId', async (req, res) => {
  const { organizationId } = req.params;
  const tree = await Hierarchy.find({ organizationId }).populate('userId managerId');
  res.json(tree);
});

export default router;
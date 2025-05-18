import express from 'express';
import Organization from '../db/models/Organization.js';
import Role from '../db/models/Role.js';

const router = express.Router();

router.post('/organization', async (req, res) => {
  const { name, industry, size } = req.body;
  try {
    const org = await Organization.create({ name, industry, size });
    res.json(org);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/role', async (req, res) => {
  const { name, permissions = [] } = req.body;
  try {
    const role = await Role.create({ name, permissions });
    res.json(role);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;

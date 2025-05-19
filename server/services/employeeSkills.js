import express from 'express';
import EmployeeSkill from '../models/EmployeeSkill.js';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const skills = await EmployeeSkill.find({ employeeId: req.params.userId });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = { employeeId: req.params.userId, ...req.body };
    const skill = await EmployeeSkill.create(data);
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:skillId', async (req, res) => {
  try {
    const filter = { employeeId: req.params.userId, skillId: req.params.skillId };
    const skill = await EmployeeSkill.findOneAndUpdate(filter, req.body, { new: true });
    if (!skill) return res.status(404).json({ error: 'User skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:skillId', async (req, res) => {
  try {
    await EmployeeSkill.deleteOne({ employeeId: req.params.userId, skillId: req.params.skillId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
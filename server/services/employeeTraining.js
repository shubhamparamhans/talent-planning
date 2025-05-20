import express from 'express';
import EmployeeTraining from '../models/EmployeeTraining.js';

const router = express.Router({ mergeParams: true });

// Get all training assignments for a user
router.get('/', async (req, res) => {
  try {
    const trainings = await EmployeeTraining.find({ employeeId: req.params.userId });
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign a course to a user
router.post('/', async (req, res) => {
  try {
    const data = { employeeId: req.params.userId, ...req.body };
    const assignment = await EmployeeTraining.create(data);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update training status for a user
router.put('/:courseId', async (req, res) => {
  try {
    const filter = { employeeId: req.params.userId, courseId: req.params.courseId };
    const assignment = await EmployeeTraining.findOneAndUpdate(filter, req.body, { new: true });
    if (!assignment) return res.status(404).json({ error: 'Training not found' });
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
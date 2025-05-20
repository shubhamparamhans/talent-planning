import express from 'express';
import TrainingCourse from '../models/TrainingCourse.js';

const router = express.Router();

// List all training courses
router.get('/', async (req, res) => {
  try {
    const courses = await TrainingCourse.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new training course
router.post('/', async (req, res) => {
  try {
    const course = await TrainingCourse.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a specific training course
router.get('/:id', async (req, res) => {
  try {
    const course = await TrainingCourse.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a training course
router.put('/:id', async (req, res) => {
  try {
    const course = await TrainingCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a training course
router.delete('/:id', async (req, res) => {
  try {
    await TrainingCourse.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
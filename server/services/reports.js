import express from 'express';

const router = express.Router();

// Generate a custom report
router.get('/generate', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

export default router;
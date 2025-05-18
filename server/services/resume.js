import express from 'express';
import { createUserProfileFromPDF } from '../agents/userProfileAgent.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body; // Accepting raw PDF text for simplicity
  try {
    const user = await createUserProfileFromPDF(text);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
export default router;
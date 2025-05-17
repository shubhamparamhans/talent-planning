// --- server/auth.js ---
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/User.js';


const auth = express.Router();
const SECRET = process.env.JWT_SECRET || 'supersecret';

// Register user
auth.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, role });
  await user.save();
  res.json({ success: true });
});

// Login user
auth.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '2h' });
  res.json({ token, role: user.role });
});

// Middleware to check auth
export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Placeholder agent endpoints to scaffold later
router.get('/agents/performance-review', authMiddleware, (req, res) => res.json({ message: 'PerformanceReviewerAgent coming soon' }));
router.get('/agents/skill-gap', authMiddleware, (req, res) => res.json({ message: 'SkillGapAgent coming soon' }));
router.get('/agents/promotion-advice', authMiddleware, (req, res) => res.json({ message: 'PromotionAdvisorAgent coming soon' }));
router.get('/agents/training-recommendation', authMiddleware, (req, res) => res.json({ message: 'TrainingRecommenderAgent coming soon' }));
router.get('/agents/retention-risk', authMiddleware, (req, res) => res.json({ message: 'RetentionRiskAgent coming soon' }));
router.get('/agents/career-path', authMiddleware, (req, res) => res.json({ message: 'CareerPathAgent coming soon' }));
router.get('/agents/team-fit', authMiddleware, (req, res) => res.json({ message: 'TeamFitAgent coming soon' }));
router.get('/agents/feedback-summary', authMiddleware, (req, res) => res.json({ message: '360FeedbackSummarizerAgent coming soon' }));


export default auth;

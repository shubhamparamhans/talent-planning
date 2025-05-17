// --- Step 2: server/index.js ---
import express from 'express';
import dotenv from 'dotenv';
import { performanceReviewHandler } from './services/mcpResolver.js';
import { connectDB } from './db/connect.js';

connectDB(); 
dotenv.config();
const app = express();
app.use(express.json());

const authRouter = require('./auth');
app.use('/api', authRouter);

app.post('/api/review', performanceReviewHandler);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

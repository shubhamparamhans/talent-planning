// --- Step 2: server/index.js ---
import express from 'express';
import dotenv from 'dotenv';
import { performanceReviewHandler } from './services/mcpResolver.js';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/api/review', performanceReviewHandler);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

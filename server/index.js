// --- Step 2: server/index.js ---
import express from 'express';
import dotenv from 'dotenv';
import { performanceReviewHandler, skillGapHandler,careerPathHandler } from './services/mcpResolver.js';
import { connectDB } from './db/connect.js';
import authRoutes from './services/auth.js';
import resumeRoutes from './services/resume.js';
import hierarchyRoutes from './services/hierarchy.js';
import orgRoutes from './services/org.js';


connectDB(); 
dotenv.config();
const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/hierarchy', hierarchyRoutes);
app.use('/api/org', orgRoutes);

app.post('/api/review', performanceReviewHandler);
app.post('/api/skillgap', skillGapHandler);
app.get('/api/skillgaps/:employeeId', skillGapHandler);
app.post('/api/career-path', careerPathHandler);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

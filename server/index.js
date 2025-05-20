// --- Step 2: server/index.js ---
import express from 'express';
import dotenv from 'dotenv';
import reviewRoutes from './services/reviews.js';
import feedbackRoutes from './services/feedback.js';
import skillsRoutes from './services/skills.js';
import employeeSkillsRoutes from './services/employeeSkills.js';
import { connectDB } from './db/connect.js';
import authRoutes from './services/auth.js';
import resumeRoutes from './services/resume.js';
import hierarchyRoutes from './services/hierarchy.js';
import orgRoutes from './services/org.js';
import userRoutes from './services/users.js';
import agentRoutes from './services/agents.js';

// Phase 3 services
import careerRoutes from './services/career.js';
import developmentPlanRoutes from './services/developmentPlan.js';
import coursesRoutes from './services/courses.js';
import employeeTrainingRoutes from './services/employeeTraining.js';
import successionPlansRoutes from './services/successionPlans.js';
import teamsRoutes from './services/teams.js';
import rolesRoutes from './services/roles.js';
import analyticsRoutes from './services/analytics.js';
import reportsRoutes from './services/reports.js';


dotenv.config();
connectDB();
const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/hierarchy', hierarchyRoutes);
app.use('/api/org', orgRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/users/:userId/skills', employeeSkillsRoutes);

// Career development & planning
app.use('/api/users/:userId/career', careerRoutes);
app.use('/api/users/:userId/development-plan', developmentPlanRoutes);

// Training courses & assignments
app.use('/api/courses', coursesRoutes);
app.use('/api/users/:userId/training', employeeTrainingRoutes);

// Succession planning & teams
app.use('/api/succession-plans', successionPlansRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/roles', rolesRoutes);

// Analytics & reporting
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportsRoutes);

app.use('/api/agents', agentRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

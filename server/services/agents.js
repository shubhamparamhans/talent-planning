import express from 'express';
import { AgentOrchestrator } from '../agents/core/AgentOrchestrator.js';
import { AgentRegistry } from '../agents/core/AgentRegistry.js';
import { AgentMemory } from '../agents/core/AgentMemory.js';
import { PerformanceContext } from '../contextSchemas/performanceContext.js';
import { SkillGapContext } from '../contextSchemas/skillGapContext.js';
import { CareerContext } from '../contextSchemas/careerContext.js';
import { runPerformanceReviewer } from '../agents/performanceReviewerAgent.js';
import { runSkillGapAgent, inferSkillGaps } from '../agents/skillGapAgent.js';
import { runCareerPathRecommender } from '../agents/careerPathRecommenderAgent.js';

const router = express.Router();
const registry = new AgentRegistry();
// Register built-in agents
registry.registerAgent('performance-review', { run: runPerformanceReviewer });
registry.registerAgent('skill-gap', { run: runSkillGapAgent });
registry.registerAgent('career-path', { run: runCareerPathRecommender });
const memory = new AgentMemory();
const orchestrator = new AgentOrchestrator(registry, memory);

router.get('/', (req, res) => {
  res.json({ agents: registry.listAgents() });
});

router.get('/:agentName/capabilities', (req, res) => {
  let schema;
  switch (req.params.agentName) {
    case 'performance-review':
      schema = PerformanceContext;
      break;
    case 'skill-gap':
      schema = SkillGapContext;
      break;
    case 'career-path':
      schema = CareerContext;
      break;
    default:
      return res.status(404).json({ error: 'Agent not found' });
  }
  res.json({ schema: schema.describe() });
});

router.post('/:agentName/query', async (req, res) => {
  try {
    const agent = registry.getAgent(req.params.agentName);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    const result = await agent.run(req.body);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/orchestrate', async (req, res) => {
  const { agents, context } = req.body;
  try {
    const result = await orchestrator.orchestrate(agents, context);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/performance-review/analyze', async (req, res) => {
  const parsed = PerformanceContext.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  try {
    const result = await runPerformanceReviewer(parsed.data);
    res.json({ result: JSON.parse(result) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/skill-gap/analyze', async (req, res) => {
  const parsed = SkillGapContext.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  try {
    const result = await runSkillGapAgent(parsed.data);
    res.json({ result: JSON.parse(result) });
  } catch (err) {
    // fallback to simple inference
    const gaps = inferSkillGaps(parsed.data.current_skills, parsed.data.required_skills);
    res.json({ gaps });
  }
});

router.post('/career-path/suggest', async (req, res) => {
  const parsed = CareerContext.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  try {
    const result = await runCareerPathRecommender(parsed.data);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Advanced agent endpoints (Phase 3)
router.post('/promotion-advisor/evaluate', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

router.post('/training-recommender/suggest', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

router.post('/retention-risk/assess', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

router.post('/team-fit/evaluate', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

router.post('/feedback-summarizer/summarize', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

router.post('/goal-coach/recommend', async (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

export default router;
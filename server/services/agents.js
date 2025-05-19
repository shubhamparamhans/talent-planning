import express from 'express';
import { AgentRegistry } from '../agents/core/AgentRegistry.js';

const router = express.Router();
const registry = new AgentRegistry();

router.get('/', (req, res) => {
  res.json({ agents: registry.listAgents() });
});

export default router;
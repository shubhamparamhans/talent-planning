export class AgentRegistry {
  constructor() {
    this.agents = new Map();
  }

  registerAgent(name, instance) {
    this.agents.set(name, instance);
  }

  getAgent(name) {
    return this.agents.get(name) || null;
  }

  listAgents() {
    return Array.from(this.agents.keys());
  }
}
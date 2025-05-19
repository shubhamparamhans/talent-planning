export class AgentOrchestrator {
  constructor(registry, memory) {
    this.registry = registry;
    this.memory = memory;
  }

  async orchestrate(agentNames, context) {
    const results = {};
    for (const name of agentNames) {
      const agent = this.registry.getAgent(name);
      if (!agent) {
        throw new Error(`Agent ${name} not found`);
      }
      const result = await agent.run(context);
      results[name] = result;
      await this.memory.save(name, result);
    }
    return results;
  }
}
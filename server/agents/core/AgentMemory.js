export class AgentMemory {
  constructor() {
    this.store = new Map();
  }

  async recall(key) {
    return this.store.get(key) || null;
  }

  async save(key, value) {
    this.store.set(key, value);
  }
}
export class BaseAgent {
  constructor(name) {
    this.name = name;
  }

  async run(context) {
    throw new Error('run method not implemented');
  }
}
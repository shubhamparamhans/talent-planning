import mongoose from 'mongoose';

const agentLogSchema = new mongoose.Schema(
  {
    agentName: String,
    logLevel: { type: String, enum: ['info', 'warning', 'error'] },
    message: String,
    context: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now },
  }
);

export default mongoose.models.AgentLog || mongoose.model('AgentLog', agentLogSchema);
import mongoose from 'mongoose';

const agentInteractionSchema = new mongoose.Schema(
  {
    agentName: String,
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    interactionType: String,
    query: String,
    response: String,
    feedback: {
      helpful: Boolean,
      comments: String,
    },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

export default mongoose.models.AgentInteraction || mongoose.model('AgentInteraction', agentInteractionSchema);
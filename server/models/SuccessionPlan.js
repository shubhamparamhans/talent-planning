import mongoose from 'mongoose';

const candidateSubSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    readinessLevel: { type: String, enum: ['ready_now', 'ready_soon', 'developmental'] },
    strengths: [String],
    gapAreas: [String],
    developmentActions: [String],
  },
  { _id: false }
);

const successionPlanSchema = new mongoose.Schema(
  {
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    currentHolder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    candidates: [candidateSubSchema],
    riskLevel: { type: String, enum: ['low', 'medium', 'high'] },
  },
  { timestamps: true }
);

export default mongoose.models.SuccessionPlan || mongoose.model('SuccessionPlan', successionPlanSchema);
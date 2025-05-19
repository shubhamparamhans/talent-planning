import mongoose from 'mongoose';

const CompetencySchema = new mongoose.Schema({
  name: String,
  rating: { type: Number, min: 1, max: 5 },
  comments: String
});

const GoalSchema = new mongoose.Schema({
  description: String,
  targetDate: Date,
  status: { type: String, enum: ['not_started', 'in_progress', 'completed'] },
  progress: { type: Number, min: 0, max: 100 }
});

const PerformanceReviewSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewCycle: String,
  reviewPeriodStart: Date,
  reviewPeriodEnd: Date,
  status: { type: String, enum: ['draft', 'submitted', 'reviewed', 'finalized'], default: 'draft' },
  overallRating: { type: Number, min: 1, max: 5 },
  competencies: [CompetencySchema],
  strengths: String,
  areasForImprovement: String,
  goals: [GoalSchema],
  employeeComments: String,
  reviewerComments: String
}, { timestamps: true });

export default mongoose.models.PerformanceReview || mongoose.model('PerformanceReview', PerformanceReviewSchema);

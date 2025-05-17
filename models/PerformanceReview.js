import mongoose from 'mongoose';

const KPISchema = new mongoose.Schema({
  name: String,
  score: Number,
  target: Number,
  comments: String
});

const FeedbackSchema = new mongoose.Schema({
  from_person: String,
  relationship: String,
  comment: String,
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative']
  }
});

const MilestoneSchema = new mongoose.Schema({
  title: String,
  achieved_on: String,
  description: String
});

const PerformanceReviewSchema = new mongoose.Schema({
  employee_id: String,
  name: String,
  role: String,
  period: String,
  kpis: [KPISchema],
  feedback: [FeedbackSchema],
  milestones: [MilestoneSchema],
  previous_rating: Number,
  result: Object, // AI generated summary, rating, etc.
}, { timestamps: true });

export default mongoose.model('PerformanceReview', PerformanceReviewSchema);

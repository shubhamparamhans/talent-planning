import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  role: String,
  period: String,
  previous_rating: Number,
  kpis: Array,
  feedback: Array,
  milestones: Array,
  summary: String,
  strengths: [String],
  improvements: [String],
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Review || mongoose.model('Review', reviewSchema);

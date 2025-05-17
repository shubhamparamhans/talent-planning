import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  current_role: String,
  aspirations: String,
  skills: Array,
  performance_summary: String,
  current_rating: Number,
  recommended_roles: [String],
  suggested_skills: [String],
  rationale: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.CareerRecommendation || mongoose.model('CareerRecommendation', careerSchema);

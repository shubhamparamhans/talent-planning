import mongoose from 'mongoose';
const feedbackSchema = new mongoose.Schema({
  employeeId: String,
  from_person: String,
  relationship: String,
  comment: String,
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'] },
  period: String
});
export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

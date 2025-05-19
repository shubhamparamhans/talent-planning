import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  rating: Number
});

const feedbackSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'PerformanceReview', required: true },
  type: { type: String, enum: ['peer', 'manager', 'direct_report', 'self'] },
  anonymous: Boolean,
  questions: [QuestionSchema],
  summary: String
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

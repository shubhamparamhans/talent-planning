import mongoose from 'mongoose';

const trainingCourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    skillsCovered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    provider: String,
    format: { type: String, enum: ['online', 'in-person', 'hybrid'] },
    duration: Number,
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    cost: Number,
    ratings: Number,
  },
  { timestamps: true }
);

export default mongoose.models.TrainingCourse || mongoose.model('TrainingCourse', trainingCourseSchema);
import mongoose from 'mongoose';

const employeeTrainingSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingCourse', required: true },
    status: { type: String, enum: ['assigned', 'in_progress', 'completed'], default: 'assigned' },
    startDate: Date,
    completionDate: Date,
    score: Number,
    feedback: String,
  },
  { timestamps: true }
);

export default mongoose.models.EmployeeTraining || mongoose.model('EmployeeTraining', employeeTrainingSchema);
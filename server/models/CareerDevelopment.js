import mongoose from 'mongoose';

const developmentPlanSubSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    targetDate: Date,
    status: String,
    actions: [String],
  },
  { _id: false }
);

const careerDevelopmentSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    careerGoals: [String],
    preferredSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    developmentPlans: [developmentPlanSubSchema],
  },
  { timestamps: true }
);

export default mongoose.models.CareerDevelopment || mongoose.model('CareerDevelopment', careerDevelopmentSchema);
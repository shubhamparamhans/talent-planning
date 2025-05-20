import mongoose from 'mongoose';

const skillProfileSubSchema = new mongoose.Schema(
  {
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
    importance: { type: Number, min: 1, max: 5 },
  },
  { _id: false }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    department: String,
    skillProfile: [skillProfileSubSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Team || mongoose.model('Team', teamSchema);
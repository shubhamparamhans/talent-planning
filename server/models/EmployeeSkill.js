import mongoose from 'mongoose';

const employeeSkillSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  proficiencyLevel: { type: Number, min: 1, max: 5 },
  certifications: [String],
  lastAssessed: Date,
  assessedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.models.EmployeeSkill || mongoose.model('EmployeeSkill', employeeSkillSchema);
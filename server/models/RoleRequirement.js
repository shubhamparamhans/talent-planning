import mongoose from 'mongoose';
const roleRequirementSchema = new mongoose.Schema({
  role: String,
  skills: [String],
  updatedAt: { type: Date, default: Date.now }
});
export default mongoose.models.RoleRequirement || mongoose.model('RoleRequirement', roleRequirementSchema);

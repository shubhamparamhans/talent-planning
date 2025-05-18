import mongoose from 'mongoose';
const hierarchySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  level: Number
});
export default mongoose.models.Hierarchy || mongoose.model('Hierarchy', hierarchySchema);

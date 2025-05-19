import mongoose from 'mongoose';
const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  industry: String,
  size: Number,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Organization || mongoose.model('Organization', organizationSchema);

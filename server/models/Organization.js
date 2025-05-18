import mongoose from 'mongoose';
const organizationSchema = new mongoose.Schema({
  name: String,
  domain: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Organization || mongoose.model('Organization', organizationSchema);

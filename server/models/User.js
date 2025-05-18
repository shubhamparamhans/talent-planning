import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  email: { type: String, unique: true },
  phone: String,
  role: String,
  experience_years: Number,
  organizationId: mongoose.Schema.Types.ObjectId
});
export default mongoose.models.User || mongoose.model('User', userSchema);

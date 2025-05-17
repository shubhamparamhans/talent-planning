import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['hr', 'manager'], required: true }
});
// const User = mongoose.models.User || mongoose.model('User', userSchema);
export default mongoose.model('User', userSchema);

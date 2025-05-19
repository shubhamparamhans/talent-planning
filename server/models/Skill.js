import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  level: { type: Number, min: 1, max: 5 },
  isRequired: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
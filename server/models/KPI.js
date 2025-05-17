import mongoose from 'mongoose';
const kpiSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  score: Number,
  target: Number,
  comments: String,
  period: String
});
export default mongoose.models.KPI || mongoose.model('KPI', kpiSchema);
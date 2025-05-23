import { z } from 'zod';
import { Feedback } from './performanceContext.js';

export const RetentionRiskContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  role: z.string(),
  tenure_months: z.number().optional(),
  feedback: z.array(Feedback).optional(),
  performance_summary: z.string().optional()
});
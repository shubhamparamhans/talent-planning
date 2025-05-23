import { z } from 'zod';

export const TrainingRecommenderContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  role: z.string(),
  skill_gaps: z.array(z.string())
});
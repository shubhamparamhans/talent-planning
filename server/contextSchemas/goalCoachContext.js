import { z } from 'zod';

export const GoalCoachContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  role: z.string(),
  aspirations: z.string(),
  performance_summary: z.string()
});
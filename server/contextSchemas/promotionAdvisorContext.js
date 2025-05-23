import { z } from 'zod';

export const PromotionAdvisorContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  current_role: z.string(),
  target_role: z.string(),
  skills: z.array(z.string()),
  performance_summary: z.string()
});
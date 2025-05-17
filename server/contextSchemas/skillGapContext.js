import { z } from 'zod';

export const SkillGapContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  role: z.string(),
  current_skills: z.array(z.string()),
  required_skills: z.array(z.string())
});
import { z } from 'zod';

export const Skill = z.object({
  name: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  interested: z.boolean()
});

export const CareerContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  current_role: z.string(),
  aspirations: z.string(),
  skills: z.array(Skill),
  performance_summary: z.string(),
  current_rating: z.number().nullable()
});

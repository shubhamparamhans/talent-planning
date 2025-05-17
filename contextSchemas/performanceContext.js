
import { z } from 'zod';

export const KPI = z.object({
  name: z.string(),
  score: z.number(),
  target: z.number(),
  comments: z.string().optional()
});

export const Feedback = z.object({
  from_person: z.string(),
  relationship: z.string(),
  comment: z.string(),
  sentiment: z.enum(['positive', 'neutral', 'negative'])
});

export const Milestone = z.object({
  title: z.string(),
  achieved_on: z.string(),
  description: z.string()
});

export const PerformanceContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  role: z.string(),
  period: z.string(),
  kpis: z.array(KPI),
  feedback: z.array(Feedback),
  milestones: z.array(Milestone),
  previous_rating: z.number().nullable()
});

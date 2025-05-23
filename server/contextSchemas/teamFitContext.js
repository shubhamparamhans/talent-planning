import { z } from 'zod';

export const TeamMember = z.object({
  employee_id: z.string(),
  role: z.string(),
  working_style: z.string()
});

export const TeamFitContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  role: z.string(),
  team_id: z.string(),
  team_members: z.array(TeamMember),
  skills: z.array(z.string())
});
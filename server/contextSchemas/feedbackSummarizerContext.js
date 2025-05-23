import { z } from 'zod';
import { Feedback } from './performanceContext.js';

export const FeedbackSummarizerContext = z.object({
  employee_id: z.string(),
  name: z.string(),
  feedbacks: z.array(Feedback)
});
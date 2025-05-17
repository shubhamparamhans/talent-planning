import { PerformanceContext } from '../contextSchemas/performanceContext.js';
import { runPerformanceReviewer } from '../agents/performanceReviewerAgent.js';

export async function performanceReviewHandler(req, res) {
  try {
    const parsed = PerformanceContext.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });

    const context = parsed.data;
    const result = await runPerformanceReviewer(context);
    return res.json({ result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
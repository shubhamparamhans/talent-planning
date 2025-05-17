import { PerformanceContext } from '../contextSchemas/performanceContext.js';
import { runPerformanceReviewer } from '../agents/performanceReviewerAgent.js';
import PerformanceReview from '../models/PerformanceReview.js';


export async function performanceReviewHandler(req, res) {
  try {
    const parsed = PerformanceContext.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });

    const context = parsed.data;
    const result = await runPerformanceReviewer(context);
    const saved = await PerformanceReview.create({ ...context, result: JSON.parse(result) });
    return res.json({ review_id: saved._id, result: saved.result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
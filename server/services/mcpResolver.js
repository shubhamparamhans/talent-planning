import { PerformanceContext } from '../contextSchemas/performanceContext.js';
import { SkillGapContext } from '../contextSchemas/skillGapContext.js';
import { CareerContext } from '../contextSchemas/careerContext.js';


import { runPerformanceReviewer } from '../agents/performanceReviewerAgent.js';
import { runSkillGapAgent } from '../agents/skillGapAgent.js';
import { runCareerPathRecommender } from '../agents/careerPathRecommenderAgent.js';
import { inferSkillGaps } from '../agents/skillGapAgent.js';


// import PerformanceReview from '../models/PerformanceReview.js';

import CareerRecommendation from '../models/CareerRecommendation.js';
import Review from '../models/Review.js';



export async function performanceReviewHandler(req, res) {
  try {
    const parsed = PerformanceContext.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });

    const context = parsed.data;
    const result = await runPerformanceReviewer(context);
    //const saved = await PerformanceReview.create({ ...context, result: JSON.parse(result) });
     // Save the review in MongoDB
    await Review.create({ ...context, ...result });
    return res.json({ result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function skillGapHandler(req, res) {
  try {
    const { employeeId } = req.params;
    const latest = await Review.findOne({ employeeId }).sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ error: 'Review not found' });

    const gaps = inferSkillGaps(latest.strengths || [], latest.improvements || []);
    return res.json({ employeeId, skillGaps: gaps });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function careerPathHandler(req, res) {
  try {
    const parsed = CareerContext.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });

    const context = parsed.data;
    const result = await runCareerPathRecommender(context);

    await CareerRecommendation.create({ ...context, ...result });

    return res.json({ result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
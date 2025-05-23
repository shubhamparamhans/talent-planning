import { openai } from '../utils/openaiClient.js';

export async function runPromotionAdvisor(context) {
  const systemPrompt = `You are an expert HR promotion advisor AI. Based on the employee's current role, target role, skills, and performance summary, assess promotion readiness.
Respond with JSON: { promotion_readiness: string, strengths: string[], development_areas: string[], recommendations: string[] }`;

  const userPrompt = `Promotion Evaluation Context:
${JSON.stringify(context, null, 2)}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    response_format: 'json'
  });

  return JSON.parse(res.choices[0].message.content);
}
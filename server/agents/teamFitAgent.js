import { openai } from '../utils/openaiClient.js';

export async function runTeamFit(context) {
  const systemPrompt = `You are a team compatibility AI. Evaluate how well the given employee fits into the specified team based on working styles, roles, and skills.
Respond with JSON: { fit_score: number, compatibility_factors: string[], recommendations: string[] }`;

  const userPrompt = `Team Fit Context:
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
import { openai } from '../utils/openaiClient.js';

export async function runGoalCoach(context) {
  const systemPrompt = `You are a goal-setting coach AI. Based on the employee's aspirations and performance summary, recommend actionable career goals.
Respond with JSON: { goals: string[], rationale: string }`;

  const userPrompt = `Goal Coaching Context:
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
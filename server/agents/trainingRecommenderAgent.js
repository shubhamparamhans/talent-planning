import { openai } from '../utils/openaiClient.js';

export async function runTrainingRecommender(context) {
  const systemPrompt = `You are a training recommendation AI. Based on the employee's skill gaps, suggest relevant training programs or courses.
Respond with JSON: { courses: string[], rationale: string }`;

  const userPrompt = `Training Context:
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
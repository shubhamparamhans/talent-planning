import { openai } from '../utils/openaiClient.js';

export async function runCareerPathRecommender(context) {
  const systemPrompt = `You are a senior career advisor AI. Recommend next career moves based on aspirations, skills, and performance. Respond in JSON: { recommended_roles: string[], suggested_skills: string[], rationale: string }`;

  const userPrompt = `Career Context:\n${JSON.stringify(context, null, 2)}`;

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

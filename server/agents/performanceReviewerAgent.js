import { openai } from '../utils/openaiClient.js';

export async function runPerformanceReviewer(context) {
  const systemPrompt = `You are an expert HR reviewer AI. Summarize employee performance.
Respond with JSON: { summary: string, strengths: string[], improvements: string[], rating: number (0-10) }`;

  const userPrompt = `Review:
${JSON.stringify(context, null, 2)}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });

  return res.choices[0].message.content;
}

import { openai } from '../utils/openaiClient.js';

export async function runFeedbackSummarizer(context) {
  const systemPrompt = `You are an expert feedback summarizer AI. Summarize feedback comments for the employee, highlighting key themes, strengths, and areas for improvement.
Respond with JSON: { summary: string, themes: string[], recommendations: string[] }`;

  const userPrompt = `Feedback Context:
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
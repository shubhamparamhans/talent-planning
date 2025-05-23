import { openai } from '../utils/openaiClient.js';

export async function runRetentionRisk(context) {
  const systemPrompt = `You are a retention risk analysis AI. Based on tenure, feedback, and performance summary, assess the likelihood of the employee leaving.
Respond with JSON: { risk_level: string, rationale: string }`;

  const userPrompt = `Retention Risk Context:
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
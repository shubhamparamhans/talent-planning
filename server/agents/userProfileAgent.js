
import { openai } from '../utils/openaiClient.js';
import User from '../db/User.js';

export async function createUserProfileFromPDF(pdfText) {
  const systemPrompt = `You are an HR assistant. Extract a professional user profile from resume text. Respond with JSON: { name: string, email: string, phone?: string, role: string, experience_years: number }`;

  const userPrompt = `Resume Text:\n${pdfText}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    response_format: 'json'
  });

  const userData = JSON.parse(res.choices[0].message.content);
  return await User.create(userData);
}
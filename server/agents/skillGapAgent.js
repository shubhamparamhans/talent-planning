import { openai } from '../utils/openaiClient.js';

export async function runSkillGapAgent(context) {
const systemPrompt = `You are a skill assessment AI. Identify gaps between current and required skills.
Respond with JSON: { gaps: string[], recommendations: string[] }`;

  const userPrompt = `Employee Skill Data:\n${JSON.stringify(context, null, 2)}`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });

  return res.choices[0].message.content;
}

export function inferSkillGaps(strengths, improvements) {
  const genericRoleSkills = ["communication", "leadership", "collaboration", "time management", "technical expertise", "problem-solving"];
  const gaps = genericRoleSkills.filter(skill => improvements.join(' ').toLowerCase().includes(skill));
  return gaps;
}
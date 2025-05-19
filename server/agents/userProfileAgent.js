import { openai } from '../utils/openaiClient.js';
import User from '../models/User.js';

export async function createUserProfileFromPDF(resumeText) {
  const prompt = `
You are a talent intelligence assistant. From the following resume text, extract:
1. Full Name
2. Email
3. List of key technical and soft skills
4. Current or last known job title
5. Inferred job role (e.g., frontend developer, backend engineer, data scientist, product manager)

Resume:
---
${resumeText}
---
Return the result as JSON with the following structure:
{
  "name": "",
  "email": "",
  "skills": [],
  "jobTitle": "",
  "inferredRole": ""
}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  const parsed = JSON.parse(response.choices[0].message.content.trim());

  const user = await User.create({
    name: parsed.name,
    email: parsed.email,
    role: parsed.inferredRole,
    jobTitle: parsed.jobTitle,
    skills: parsed.skills,
  });

  return user;
}

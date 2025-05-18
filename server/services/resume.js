import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import { createUserProfileFromPDF } from '../agents/userProfileAgent.js';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    const user = await createUserProfileFromPDF(resumeText);

    // Save resume file path to user (add `resumeUrl` field in User model)
    user.resumeUrl = filePath;
    await user.save();

    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
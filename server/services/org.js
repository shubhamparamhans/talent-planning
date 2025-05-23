import express from 'express';
import Organization from '../models/Organization.js';
import Role from '../models/Role.js';
import multer from 'multer';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import User from '../models/User.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/organization', async (req, res) => {
  const { name, industry, size } = req.body;
  try {
    const org = await Organization.create({ name, industry, size });
    res.json(org);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * Bulk import organization and users from a CSV file.
 * Expects multipart/form-data with fields:
 * - file: CSV file with headers matching user properties (e.g., name, email, phone, jobTitle, skills, experience_years, role)
 * - name, industry, size: organization details
 */
router.post('/import', upload.single('file'), async (req, res) => {
  const { name, industry, size } = req.body;
  try {
    const org = await Organization.create({ name, industry, size });
    const fileContent = fs.readFileSync(req.file.path);
    const records = parse(fileContent, { columns: true, skip_empty_lines: true });
    const users = [];
    for (const row of records) {
      let roleDoc = await Role.findOne({ name: row.role });
      if (!roleDoc) {
        roleDoc = await Role.create({ name: row.role, permissions: [] });
      }
      const userData = {
        name: row.name,
        email: row.email,
        phone: row.phone,
        jobTitle: row.jobTitle || row.job_title,
        skills: row.skills ? row.skills.split(',').map((s) => s.trim()) : [],
        experience_years: row.experience_years ? Number(row.experience_years) : undefined,
        organizationId: org._id,
        role: roleDoc.name
      };
      const user = await User.create(userData);
      users.push(user);
    }
    res.json({ organization: org, users });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/role', async (req, res) => {
  const { name, permissions = [] } = req.body;
  try {
    const role = await Role.create({ name, permissions });
    res.json(role);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;

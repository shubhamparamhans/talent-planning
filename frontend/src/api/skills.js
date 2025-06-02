import axios from 'axios';

const BASE = 'http://localhost:3000/api';

export async function getSkills() {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE}/skills`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createSkill(data) {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${BASE}/skills`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateSkill(id, data) {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${BASE}/skills/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function deleteSkill(id) {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${BASE}/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
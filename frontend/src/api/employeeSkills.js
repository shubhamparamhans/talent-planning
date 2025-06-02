import axios from 'axios';

const BASE = 'http://localhost:3000/api';

export async function getEmployeeSkills(userId) {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE}/users/${userId}/skills`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createEmployeeSkill(userId, data) {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${BASE}/users/${userId}/skills`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateEmployeeSkill(userId, skillId, data) {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${BASE}/users/${userId}/skills/${skillId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function deleteEmployeeSkill(userId, skillId) {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${BASE}/users/${userId}/skills/${skillId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
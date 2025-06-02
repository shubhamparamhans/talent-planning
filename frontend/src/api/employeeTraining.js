import axios from 'axios';

const BASE = 'http://localhost:3000/api';

export async function getEmployeeTraining(userId) {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE}/users/${userId}/training`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createEmployeeTraining(userId, data) {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${BASE}/users/${userId}/training`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateEmployeeTraining(userId, courseId, data) {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${BASE}/users/${userId}/training/${courseId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
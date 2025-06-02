import axios from 'axios';

const BASE = 'http://localhost:3000/api';

export async function getRoles() {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE}/roles`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createRole(data) {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${BASE}/roles`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateRole(id, data) {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${BASE}/roles/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function deleteRole(id) {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${BASE}/roles/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
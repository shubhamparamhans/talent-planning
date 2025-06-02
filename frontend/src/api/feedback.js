import axios from 'axios';

const BASE = 'http://localhost:3000/api';

export async function getFeedbackByReview(reviewId) {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE}/reviews/${reviewId}/feedback`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function getFeedbackByUser(userId) {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE}/users/${userId}/feedback`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function getFeedbackById(id) {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE}/feedback/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createFeedback(data) {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${BASE}/feedback`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
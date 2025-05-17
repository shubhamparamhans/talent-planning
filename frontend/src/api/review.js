import axios from 'axios';

const BASE = 'http://localhost:3000/api';

export async function postReview(data) {
  const token = localStorage.getItem('token');
  const context = {
    ...data,
    previous_rating: null
  };
  const res = await axios.post(`${BASE}/review`, context, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function getReviews() {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE}/reviews`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data || [];
}

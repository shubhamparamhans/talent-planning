import axios from 'axios';

const BASE = 'http://localhost:3000/api';

export async function postReview(data) {
  const context = {
    ...data,
    previous_rating: null
  };
  const res = await axios.post(`${BASE}/review`, context);
  return res.data;
}

export async function getReviews() {
  const res = await axios.get(`${BASE}/reviews`);
  return res.data || [];
}
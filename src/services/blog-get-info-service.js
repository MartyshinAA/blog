import axios from 'axios';

// let API_KEY;

export async function BlogGetInfo(offset = 0) {
  let response = [];
  try {
    response = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);
  } catch (error) {
    if (error.request.status === 404) return response;
  }
  return response;
}

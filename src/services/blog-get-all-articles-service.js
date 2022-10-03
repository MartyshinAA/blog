import axios from 'axios';

export async function BlogGetArticles(offset = 0) {
  let response;
  try {
    response = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);
  } catch (error) {
    console.error(error);
  }
  return response;
}

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '23028809-0eadab1d20ccc1cb386303aa3';

export function getPictures(query, page) {
  return axios
    .get(
      `/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`,
    )
    .then(resp => resp.data.hits);
}

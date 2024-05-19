import axios from 'axios';

export const PER_PAGE = 15;
const API_KEY = '43826847-f350fa9fd32410ec3fefedfc5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = async (q = 'flowers', newsPage = 1) => {
  const searchParams = {
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: PER_PAGE,
    page: newsPage,
  };
  return await axios('', {
    params: {
      ...searchParams,
    },
  });
};

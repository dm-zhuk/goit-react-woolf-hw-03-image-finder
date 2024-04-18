import axios from 'axios';
import { toast } from 'react-toastify';

const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '22046149-41a2515b5a783e6a5f4bfbfcc',
  per_page: perPage,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get('/', {
      params: {
        ...axios.defaults.params,
        q: query,
        page: page,
      },
    });

    const { hits, totalHits } = response.data;
    const onLoadMore = page < Math.ceil(totalHits / perPage);

    const formattedHits = hits.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      })
    );

    return {
      hits: formattedHits,
      onLoadMore,
    };
  } catch (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }
};

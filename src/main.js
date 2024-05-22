import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { createGallaryItem } from './js/render-functions.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { PER_PAGE } from './js/pixabay-api';

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.form-field');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.js-load-btn');

let searchQuery = '';
let newsCurrentPage = 1;
let totalPages = 0;

loadMoreBtnEl.classList.add('d-none');

async function onSearchFormSubmit(event) {
  event.preventDefault();
  newsCurrentPage = 1;
  loadMoreBtnEl.classList.add('d-none');
  searchQuery = event.target.elements.searchKeyword.value.trim();
  if (searchQuery === '') {
    galleryEl.innerHTML = '';
    iziToast.error({
      timeout: 2000,
      position: 'topRight',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#fff',
      backgroundColor: '#d37a7a',
      close: false,
      closeOnClick: true,
    });
    event.target.reset();
    return;
  }

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');

  try {
    const { totalHits, data } = await fetchPhotosByQuery(
      searchQuery,
      newsCurrentPage
    );
    if (data.hits.length === 0) {
      loaderEl.classList.add('is-hidden');
      iziToast.error({
        timeout: 2000,
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        backgroundColor: '#d37a7a',
        close: false,
        closeOnClick: true,
      });
      event.target.reset();
      return;
    }

    galleryEl.insertAdjacentHTML('beforeend', createGallaryItem(data.hits));

    totalPages = Math.ceil(data.totalHits / PER_PAGE);

    if (totalPages > 1) {
      loadMoreBtnEl.classList.remove('d-none');
    }

    gallery.refresh();
    if (newsCurrentPage >= totalPages) {
      loadMoreBtnEl.classList.add('d-none');
      iziToast.error({
        timeout: 5000,
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        backgroundColor: '#d37a7a',
        close: false,
        closeOnClick: true,
      });
    }
  } catch (error) {
    console.log(error);
  }

  event.target.reset();
  loaderEl.classList.add('is-hidden');
}

const smoothScrollOnLoadMore = () => {
  const lastEl = galleryEl.querySelector('.js-section-images:last-child');
  const newEl = lastEl.getBoundingClientRect().height * 2;
  window.scrollBy({
    top: newEl,
    left: 0,
    behavior: 'smooth',
  });
};

async function onClickLoadMore(event) {
  try {
    newsCurrentPage += 1;
    loadMoreBtnEl.classList.add('d-none');
    loaderEl.classList.remove('is-hidden');
    const { data, totalHits } = await fetchPhotosByQuery(
      searchQuery,
      newsCurrentPage
    );
    galleryEl.insertAdjacentHTML('beforeend', createGallaryItem(data.hits));
    gallery.refresh();
    smoothScrollOnLoadMore();
    totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (totalPages > 1) {
      loadMoreBtnEl.classList.remove('d-none');
    }
    loaderEl.classList.add('is-hidden');
    if (newsCurrentPage >= totalPages) {
      loadMoreBtnEl.classList.add('d-none');
      iziToast.error({
        timeout: 5000,
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        backgroundColor: '#d37a7a',
        close: false,
        closeOnClick: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onClickLoadMore);

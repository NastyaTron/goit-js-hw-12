import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { createGallaryItem } from './js/render-functions.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { PER_PAGE } from './js/pixabay-api';

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.form-field');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.js-load-btn');

let newsCurrentPage = 1;
let searchQuery = '';
let totalPages = 0;
loadMoreBtnEl.classList.add('d-none');

searchFormEl.addEventListener('submit', onSearchFormSubmit);
async function onSearchFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements.searchKeyword.value.trim();
  if (searchQuery === '') {
    galleryEl.innerHTML = '';
    event.target.reset();
    loadMoreBtnEl.classList.add('d-none');
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
      loadMoreBtnEl.classList.add('d-none');
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
    }

    galleryEl.insertAdjacentHTML('beforeend', createGallaryItem(data.hits));

    totalPages = Math.ceil(data.totalHits / PER_PAGE);

    if (totalPages > 1) {
      loadMoreBtnEl.classList.remove('d-none');
    }

    new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    // lightbox.refresh();
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

loadMoreBtnEl.addEventListener('click', onClickLoadMore);

async function onClickLoadMore(event) {
  newsCurrentPage += 1;
  loadMoreBtnEl.classList.add('d-none');
  loaderEl.classList.remove('is-hidden');
  const { data } = await fetchPhotosByQuery(searchQuery, newsCurrentPage);
  galleryEl.insertAdjacentHTML('beforeend', createGallaryItem(data.hits));

  smoothScrollOnLoadMore();
  totalPages = Math.ceil(data.totalHits / PER_PAGE);
  if (totalPages > 1) {
    loadMoreBtnEl.classList.remove('d-none');
  }
  loaderEl.classList.add('is-hidden');

  if (newsCurrentPage > totalPages) {
    loadMoreBtnEl.classList.add('d-none');
    loadMoreBtnEl.removeEventListener('click', onClickLoadMore);
    iziToast.error({
      timeout: 2000,
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
      messageColor: '#fff',
      backgroundColor: '#d37a7a',
      close: false,
      closeOnClick: true,
    });
  }
}

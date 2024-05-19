export const createGallaryItem = itemImages => {
  return itemImages
    .map(
      images =>
        `<div class="js-section-images">
        <a href="${images.largeImageURL}">
        <img
          src="${images.webformatURL}"
          alt="${images.tags}"
          class="js-gallery-img"
        /></a>
        <div class="js-group-text">
          <small class="js-text"
            >Likes <span class="js-span-text">${images.likes}</span></small
          >
          <small class="js-text"
            >Views <span class="js-span-text">${images.views}</span></small
          >
          <small class="js-text"
            >Comments <span class="js-span-text">${images.comments}</span></small
          >
          <small class="js-text"
            >Downloads
            <span class="js-span-text">${images.downloads}</span></small
          >
        </div>
    </div>`
    )
    .join('');
};

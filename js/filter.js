const RANDOM_PHOTOS_COUNT = 10;
const filtersButtonContainer = document.querySelector('.img-filters__form');
let currentFilter = 'filter-default';
let photos = [];

const randomSort = () => Math.random() - 0.5;

const byCommentsSort = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

export const getSortedGallery = () => {
  if (currentFilter === 'filter-random') {
    return photos.slice().sort(randomSort).slice(0, RANDOM_PHOTOS_COUNT);
  }else if(currentFilter === 'filter-discussed') {
    return photos.slice().sort(byCommentsSort);
  } else {
    return photos;
  }
};

const setOnFiltersClick = (cb) => {
  filtersButtonContainer.addEventListener('click', (evt) => {
    for (let i = 0; i < filtersButtonContainer.children.length; i++) {
      filtersButtonContainer.children[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    cb(getSortedGallery());
  });
};

export const init = (loadedGallery, createGallery) => {
  photos = [...loadedGallery];
  setOnFiltersClick(createGallery);
};

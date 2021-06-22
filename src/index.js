import './sass/main.scss';

const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const gallery = document.querySelector(".js-gallery");
const ligthbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image")
const lightboxButton = document.querySelector(".lightbox__button")
const lightboxOverlay = document.querySelector(".lightbox__overlay");
let setItemGallery = " ";

// Добавляю элементы в html.
let idx = 0;
galleryItems.forEach(item => {
   setItemGallery += (`<li class = "gallery__item"><a class = "gallery__link" href = "${item.original}"><img class = "gallery__image" src = "${item.preview}" alt = "${item.description}" data-source = "${item.original}" data-idx="${idx}"></a></li>`);
   idx += 1;
});
gallery.insertAdjacentHTML('afterbegin', setItemGallery);

// Добавляю слушателей
gallery.addEventListener('click', openImage);


// Функция открытия картинки в оригинальном размере
function openImage(event) { 
   event.preventDefault();
   ligthbox.classList.add('is-open');
   lightboxImage.setAttribute('src', event.target.getAttribute('data-source'));
   lightboxImage.setAttribute('alt', event.target.getAttribute('alt'));
   lightboxImage.setAttribute('data-idx', event.target.getAttribute('data-idx'));
   lightboxButton.addEventListener('click', closeImage);
   lightboxOverlay.addEventListener('click', closeImage);
   window.addEventListener('keyup', keyboard);
   window.addEventListener('keyup', slider);
};

// Функция закрытия картинки
function closeImage(event) {
   ligthbox.classList.remove('is-open');
   lightboxImage.setAttribute('src', "");
   lightboxImage.setAttribute('alt', "");
   lightboxButton.removeEventListener('click', closeImage);
   lightboxOverlay.removeEventListener('click', closeImage);
   window.removeEventListener('keyup', keyboard);
   window.removeEventListener('keyup', slider);     
};

// Закрытие по "Esc"
function keyboard(event) {
   if (event.key === "Escape") {
      closeImage()
   };
};

// Слайдер

function slider(event) {
   if (event.key === "ArrowLeft") {
      swipe(galleryItems, -1);
   };
    if (event.key === "ArrowRight") {
       swipe(galleryItems, 1);
   };
};

function swipe(galleryItems, delta) {
   let index = lightboxImage.getAttribute("data-idx");
   let indexSlider = Number(index) + delta;
   if (indexSlider < 0) {
      indexSlider = galleryItems.length - 1;
   }
   else if (indexSlider === galleryItems.length) {
      indexSlider = 0;
   };
   lightboxImage.setAttribute('src', galleryItems[indexSlider].original);
   lightboxImage.setAttribute('alt', galleryItems[indexSlider].description);
   lightboxImage.setAttribute('data-idx', indexSlider);      
};



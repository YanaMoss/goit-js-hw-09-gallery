import './sass/main.scss';
import galleryItems from './js/gallery-items';

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



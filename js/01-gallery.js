import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

function creatGallery(images) {
  return images
    .map(
      (image) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${image.original}">
        <img
            class="gallery__image"
            src="${image.preview}"
            data-source="${image.original}"
            alt="${image.description}"
         />
         </a>
    </div>`
    )
    .join("");
}

const addGallery = creatGallery(galleryItems);
galleryContainer.innerHTML = addGallery;

console.log(galleryContainer);

//------- МОДАЛЬНЕ ВІКНО--------

galleryContainer.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width = "800" height ="600">`
  );
  instance.show();

  if (instance.show() === true) {
    window.addEventListener("scroll", (event) => {
      window.scrollTo(0, 0);
    });
    galleryContainer.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        instance.close();
      }
    });
  }
}

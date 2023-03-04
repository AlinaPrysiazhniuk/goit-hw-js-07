import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

function creatGallery(images) {
  return images
    .map(
      (image) =>
        `<a class="gallery__item" href="${image.original}">
        <img
            class="gallery__image"
            src="${image.preview}"
            alt="${image.description}"
         />
         </a>`
    )
    .join("");
}

const addGallery = creatGallery(galleryItems);
galleryContainer.innerHTML = addGallery;

console.log(galleryContainer);

galleryContainer.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });

  galleryContainer.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  });
}

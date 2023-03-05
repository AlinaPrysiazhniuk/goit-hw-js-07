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

const addGallery = creatGallery(galleryItems); //в змінну записала результат виклику функції, що створювала галерею
galleryContainer.innerHTML = addGallery; //додала всю галерею до HTML
//дивилася в РЕпети, то він казав, що якщо ви по факту створюєте щось нове, то можна додавати його до документу через innerHTML, я так і зробила

console.log(galleryContainer);

//------- МОДАЛЬНЕ ВІКНО--------

galleryContainer.addEventListener("click", onImageClick); //поставила прослуховування на клік по галереї і в колбек функцію записала функцію, що буде виконуватися по кліку

function onImageClick(event) {
  event.preventDefault(); //заборонила можливість переходу за посиланням по кліку на картинку , це ось цей пункт "Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням."
  if (event.target.nodeName !== "IMG") {
    //перевіряємо - якщо подія по кліку відбулася не на елементі img то виходимо з функції
    return;
  }

  //якщо ж клік був на картинці, то виконуємо код далі
  //ось це якраз бібіотека basicLightbox створює модалку при натиску на картинку
  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width = "800" height ="600">`
  );
  instance.show(); //а тут якраз створена модалка і додана до неї картинка відкривається

  //ось тут я дещо дописала, цього не було в завданні, я в Репети побачила, але здала без цього
  //якщо модалка відкрита, то при скролі  - сторінка за модалкою не прокручується
  if (instance.show() === true) {
    window.addEventListener("scroll", (event) => {
      window.scrollTo(0, 0);
    });

    //і якшо модалка відкрита то вішаємо прослуховування на клавіатуру для натиску esc

    galleryContainer.addEventListener("keydown", offEscapeClose);

    function offEscapeClose(event) {
      if (event.code === "Escape") {
        //якщо написнута esc то модалка закривається
        instance.close();
        galleryContainer.removeEventListener("keydown", offEscapeClose);
      }
    }
  }
}

//я не додавала сюди зняття прослуховування, розберусь і тоді допишу та скину тобі

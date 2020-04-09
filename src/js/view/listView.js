// Жорын найрлагыг дэлгэцэнд үзүүлэх VIEW

import { elements } from "./base";

// Найрлагны элемент орж ирэхэд уг элементийг дэлгэцэнд гаргах функц
export const renderItem = (item) => {
  // Найрлагны элемент орж ирэхэд уг элементийг дэлгэцэнд харуулах HTML код
  const html = `
   <li class="shopping__item">
        <p class="shopping__description">${item}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
   `;
  // shoppingList-таг дотор html-кодыг байрлуулах
  elements.shoppingList.insertAdjacentHTML("beforeend", html);
};
// Листыг цэвэрлэдэг функц
export const clearItems = () => {
  elements.shoppingList.innerHTML = "";
};

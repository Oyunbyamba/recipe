// Like - ийн VIEW буюу дэлгэц дээр харагдах байдал

import { elements } from "./base";

// Like - товчны дүрс toggle - хийдэг функц /Дарах бүрд дүрс нь солигддог байх/
export const toggleLikeButton = (isLiked) => {
  // Лайклагдсан эсэхээс хамаарч товчны хэлбэр ямар байхыг /атрибутын нэрийг/ сонгоно
  const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
  // HTML код руу сонгогдсон атрибутын нэрийг бичнэ.
  // 1. DOM-оос классын нэрээр "use" элементийг хайж олно
  const domWriteToUse = document.querySelector(".recipe__love use");
  // 2. Хайж олсон use-элементийн 'href'-атрибутыг өөрчилнө
  //domWriteToUse.setAttribute("href", `img/icons.svg#icon-heart-outlined`);
  domWriteToUse.setAttribute("href", `img/icons.svg#${iconString}`);
};

// Like - дарагдсан цэсийг гаргаж ирэх
export const toggleLikeMenu = (numLikes) => {
  // Хэрэв ямар ч лайк дарагдаагүй бол менюны товч гарч ирэхгүй байх
  // DOM-ийн элементийн CSS-ын style-ийг нь өөрчилнө.
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

// Лайкалсан жорыг Лайк цэс руу дамжуулах функц
export const renderLike = (newLike) => {
  // DOM-оос лайклагдсан жор байрлах HTML кодыг select-хийж авна
  const html = `
    <li>
        <a class="likes__link" href="#${newLike.id}">
            <figure class="likes__fig">
                <img src="${newLike.img}" alt="Test" />
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${newLike.title}</h4>
                <p class="likes__author">${newLike.publisher}</p>
            </div>
        </a>
    </li>
  `;
  // HTML код доторх li-г likeList-таг руу оруулна
  elements.likesList.insertAdjacentHTML("beforeend", html);
};

// Лайкалсан жорыг болиулах үед меню дээрээс утгах функц
export const deleteLike = (id) => {
  // DOM-оос ID агуулж байгаа а-элементийг олоод, parent элемент /li/-г нь устгана
  // а-элементийг "likes__link"-классын "href"-атрибутад агуулагдаж байгаа ID-ээр нь шүүж авна
  const el = document.querySelector(`.likes__link[href*="${id}"]`);
  // а элемент /el/-ийн parent /li/-г олно
  const li = el.parentElement;
  // li-ийн parent /ul/-г олоод тэндээсээ li-г устгана.
  if (el) li.parentElement.removeChild(li);
};

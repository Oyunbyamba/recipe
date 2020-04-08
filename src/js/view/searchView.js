import { elements } from "./base";
// publisher: "Two Peas and Their Pod"
// title: "Avocado Pita Pizza with Cilantro Sauce"
// source_url: "http://www.twopeasandtheirpod.com/avocado-pita-pizza-with-cilantro-sauce/"
// recipe_id: "54388"
// image_url: "http://forkify-api.herokuapp.com/images/avocadopizzawithcilantrosauce4bf5.jpg"
// social_rank: 99.99999665701256
// publisher_url: "http://www.twopeasandtheirpod.com"
// private function

const renderRecipe = (recipe) => {
  console.log(recipe);
  const markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
  </li>
   `;
  // HTML - ын ul - таг руу нэмнэ.
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  // Хайлтын үр дүнг хуудаслаж үзүүлэх эхний хэсэг
  // Хэрэв page = 2 бол start = 10, end = 20 дахь элементийг үзүүлнэ.
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  // Хуудаслалтын товчуудыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

// Хуудаслалтын товчний HTML бичих функц /type ==> 'prev', 'next' -гэсэн утга авна/
const createButton = (page, type, direction) => `
<button class="btn-inline results__btn--${type}" data-goto=${page}>
  <span>Хуудас ${page}</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${direction}"></use>
    </svg>
</button>`;
// Хуудаслалтын товчыг дэлгэц дээр харуулах функц
const renderButtons = (currentPage, totalPages) => {
  let buttonHTML;
  if (currentPage === 1 && totalPages > 1) {
    // 1-р хуудас дээр байна. 2-р хуудас гэдэг товчийг гарга
    buttonHTML = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    // Өмнөх болон дараачийн хуудас руу шилжүүлэх товчийг үзүүлнэ
    buttonHTML = createButton(currentPage - 1, "prev", "left");
    buttonHTML += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // Хамгийн сүүлийн хуудас дээр байна. Өмнөх руу шилжүүлэх товчийг харуулна
    buttonHTML = createButton(currentPage - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHTML);
};

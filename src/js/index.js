import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import Like from "./model/Like";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe,
} from "./view/recipeView";

/**
 * Web app төлөв / state /
 *
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкалсан жоруудын жагсаалт
 * - Захиалж байгаа жорын найрлагууд
 */
// Моделийг үүсгээд state = {} руу хийж өгнө. Ингэснээр state-ээс бүх модел руу хандах болмжтой болно
const state = {};

/**
 * ХАЙЛТЫН КОНТРОЛЛЕР - controlSearch();
 * Model, View 2-ыг хооронд нь холбогч / Model ==> Controller <== View /
 */
const controlSearch = async () => {
  // 1. Вэбээс хайлтын түлхүүр үгийг гаргаж авна. /Хайлт хийсэн утга авна - "pizza" гм/
  const query = searchView.getInput();

  if (query) {
    // 2. Түлхүүр үгээр хайдаг Search()-обьектыг үүсгэж өгнө. /Шинээр хайлтын обьектыг үүсгэнэ/
    // Моделийг үүсгээд App-ны state = {} руу хийж өгнө. Ингэснээр state-ээс бүх модел руу хандана
    state.search = new Search(query);

    // 3. Хайлтыг гүйцэтгэнэ.
    // Хайлт хийж байхад хүлээх дүрс гаргах
    renderLoader(elements.searchResultDev);
    await state.search.doSearch();
    // 4. Хайлт хийхэд зориулж дэлгэцийг бэлтгэнэ /UI/. /Хайлтын үр дүнг харуулах хэсгийг цэвэрлэж бэлтгэнэ/
    searchView.clearSearchResult();
    searchView.clearSearchQuery();

    // 5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй ...");
    else searchView.renderRecipes(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Submit автоматаар хийгдэх үйлдлийг болиулна. /Пост хийгдэхгүй/
  controlSearch();
});
// Хуудаслалт харуулдаг товч дээр листенер тавих
// Гаднах div - дээр листенер тавингаа дотор нь байгаа 2 товчны алинд нь илүү ойрхон дарсан
// гэдгийг олж болдог /closest(".className")/

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    // Өөр хуудас руу шилжихдээ үзүүлж байсан үр дүнгээ устгана
    searchView.clearSearchResult();
    // Ямар хуудас руу шилжих гэж байгаагаа барьж авна
    // HTML-доторх "data-goto1=2"-д хандахдаа "dataset.A" - гэж хандана. /dataset.goto1 ==> "2"/
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    // Үр дүнг дэлгэцэнд үзүүлнэ
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/**
 * ЖОРЫН КОНТРОЛЛЕР - controlRecipe();
 */

const controlRecipe = async () => {
  // 1. URL-аас ID-г салгаж авна
  // #id -хэсгийг URL-аас салгаж аваад #-тэмдгийг устгана
  const id = window.location.hash.replace("#", "");

  // URL дээр id-байгаа эсэхийг шалгана /"id === true"/. Байвал эргэлддэг дүрс гаргана.
  if (id) {
    // 2. Жорын моделийг үүсгэж өгнө
    // Жорын моделийг үүсгээд App-ны state = {} руу хийж өгнө. Ингэснээр state-ээс бүх модел руу хандана
    state.recipe = new Recipe(id);
    // 3. UI дэлгэцийг бэлтгэнэ /Жор байрлуулах, өмнө гарсан жорыг устгах/
    // Хайлтаар гарч ирсэн жорын мэдээллийг устгана
    clearRecipe();
    // Хайж байхад хүлээх дүрсийг харуулна
    renderLoader(elements.recipeDiv);
    // Хайлтын үр дүнгээс сонгогдсон жорыг тэмдэглэж харуулах
    highlightSelectedRecipe(id);

    // 4. Жороо татаж авчирна
    await state.recipe.getRecipe();
    // Хүлээхийг сануулсан эргэлддэг дүрсийг алга богоно
    clearLoader();
    // 5. Жорыг гүйцэтгэх хугацаа, орцыг тооцоолно
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6. Жороо дэлгэцэнд гаргана
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};
// URL-дахь #-ны ард байгаа ID өөрчлөгдөхөд hash өөрчлөгдөнө.
// Энэ өөрчлөгдсөн hash-ыг барьж авах эвентлистенер
// window.addEventListener("hashchange", controlRecipe);
// refrish - хийхэд тухайн hash - хэвээрээ байх
// window.addEventListener("load", controlRecipe);

// Дээрх 2 addEventListener-ийг нийлүүлж, хялбар бичих боломж:
["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

// Web app ачаалагдангуут "load"-функц дуудагдана
window.addEventListener("load", (e) => {
  // if - Хэрэв Лайк-массив хоосон бол /state.likes === false/ шинээр үүсгэнэ гэж шалгана
  // new Like() - localStirage дээр likes-ийн data байвал хадгалаад, байхгүй бол шинээр үүсгэнэ
  if (!state.likes) state.likes = new Like();
  // Лайк цэсийг гаргах эсэхийг шийдэх /Жор лайкын тоо === 0 үед харагдахгүй байх/
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
  // localStorage дотор лайкууд байвал тэдгээрийг цэсэнд нэмж харуулна
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

/**
 * НАЙРЛАГНЫ ЖАГСААЛТ УДИРДАХ КОНТРОЛЛЕР - controlList
 */

const controlList = () => {
  // 1. Найрлагны модел үүсгэнэ
  state.list = new List();

  // Өмнө харагдаж байсан найрлагны лист устгах
  listView.clearItems();

  // 2. Уг модел руу одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ
  state.recipe.ingredients.forEach((n) => {
    // Орж ирсэн жорыг Лист-руу хийнэ /Найрлагыг модел руу хийнэ/
    const item = state.list.addItem(n);
    // Орж ирсэн жорыг HTML кодны дагуу дэлгэцэнд гаргана
    listView.renderItem(item);
  });
};
/**
 * LIKE - Контроллер
 */
// Like дарагдсан жорыг авч модел руу хийх
const controlLike = () => {
  // 1. Лайкийн моделийг үүсгэнэ.
  // if - Хэрэв Лайк-массив хоосон бол /state.likes === false/ шинээр үүсгэнэ гэж шалгана
  if (!state.likes) state.likes = new Like();

  // 2. Одоо харагдаж байгаа жорын ID-г олж авах
  const currentRecipeId = state.recipe.id;
  // 3. Энэ жорыг лайкалсан эсэхийг шалгах
  if (state.likes.isLiked(currentRecipeId)) {
    // 4. Лайкалсан бол лайкийг нь болиулна
    state.likes.deleteLike(currentRecipeId);
    // Лайкын цэснээс жорыг устгана
    likesView.deleteLike(currentRecipeId);
    // Лайклагдаагүй - гэсэн товчийг харуулна
    likesView.toggleLikeButton(false);
  } else {
    // 5. Лайклаагүй бол лайклана
    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );

    // Лайк цэсэнд энэ лайкыг оруулах
    // newLike-аар орж ирсэн үр дүнг render-лэнэ /HTML кодны харгалзах хэсэгт байрлуулна/
    likesView.renderLike(newLike);
    // Лайклагдсан гэсэн товчыг харуулна
    likesView.toggleLikeButton(true);
  }
  // Лайк менюг ил гаргана. / 1-ээс олон жор лайклагдсан бол меню ил гарч ирнэ/
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

// "САГСАНД ХИЙХ"-товч дээр болон Like- товч дээр листенер тавих
elements.recipeDiv.addEventListener("click", (e) => {
  //terget-буюу click хийгдсэн элементийн доторх css-ыг "matches" - функцээр шүүж авна
  // ".recipe__btn" -зөвхөн товч, ".recipe__btn * " - энэ доторх бүх элементийг сонгож авна
  // ".recipe__btn * " - товч доторх зураг, текст сонгогдоно
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    // Лайк товч дээр дарагдах үед листенер тавих
    controlLike();
  }
});

// "МИНИЙ САГС" -хэсэгт литенер тавих
elements.shoppingList.addEventListener("click", (e) => {
  //а. Click хийгдсэн li-элементийн "data-itemid" атрибутын утгыг шүүж авна /ID-г нь авна/
  //б. Авсан ID-ээр нь дуудаж моделоос устгана.
  //в. Дэлгэц дээрээс тухайн ID-тай орцыг устгана

  // а1. target /shopping__item/-д х.ойрхон click хийгдсэн элементийг сонгож авах /closest-ашиглана/
  const obj = e.target.closest(".shopping__item");
  // а2. obj-таг доторх data-д заасан утгыг авах
  const id = obj.dataset.itemid; // data-itemid="asdf" ==> "asdf"
  // б. Олдсон ID-тэй орцыг моделоос утгана.
  state.list.deleteItem(id);

  // в. Дэлгэцээс тухайн ID-тай орцыг устгах
  listView.deleteItem(id);
});

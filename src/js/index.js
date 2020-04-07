import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";

/**
 * Web app төлөв / state /
 *
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкалсан жоруудын жагсаалт
 * - Захиалж байгаа жорын найрлагууд
 */
const state = {};
const controlSearch = async () => {
  // 1. Вэбээс хайлтын түлхүүр үгийг гаргаж авна. /Хайлт хийсэн утга авна - "pizza" гм/
  const query = searchView.getInput();

  if (query) {
    // 2. Түлхүүр үгээр хайдаг Search()-обьектыг үүсгэж өгнө. /Шинээр хайлтын обьектыг үүсгэнэ/
    state.search = new Search(query);

    // 3. Хайлтыг гүйцэтгэнэ.
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

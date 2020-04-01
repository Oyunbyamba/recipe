import Search from "./model/search";

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
  const query = "pizza";

  if (query) {
    // 2. Түлхүүр үгээр хайдаг Search()-обьектыг үүсгэж өгнө. /Шинээр хайлтын обьектыг үүсгэнэ/
    state.search = new Search(query);

    // 3. Хайлт хийхэд зориулж дэлгэцийг бэлтгэнэ /UI/. /Хайлтын үр дүнг харуулах хэсгийг цэвэрлэж бэлтгэнэ/
    // 4. Хайлтыг гүйцэтгэнэ.
    await state.search.doSearch();
    // 5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    console.log(state.search.result);
  }
};
document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault(); // Submit автоматаар хийгдэх үйлдлийг болиулна. /Пост хийгдэхгүй/
  controlSearch();
});

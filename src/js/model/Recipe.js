// Тухайн жорыг ID-аар нь дуудаж, татаж авчраад үзүүлэх модел

import axios from "axios";

// Recipe - class нь жорын мэдээллийг хадгалаад бусад руугаа импорт хийнэ
export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  // Интернэт сервисээс axios-ашиглан жорын мэдээлэл татдаг функц
  async getRecipe() {
    const result = await axios(
      "https://forkify-api.herokuapp.com/api/get?rId=" + this.id
    );

    this.publisher = result.data.recipe.publisher;
    this.ingredients = result.data.recipe.ingredients;
    this.source_url = result.data.recipe.source_url;
    this.image_url = result.data.recipe.image_url;
    this.social_rank = result.data.recipe.social_rank;
    this.publisher_url = result.data.recipe.publisher_url;
    this.title = result.data.recipe.title;
  }
  // Жорын гүйцэтгэх хугацаа, орцыг тооцоолох функц
  calcTime() {
    // 1 найрлага дээр 5 мин зарцуулна гэж тооцоольё
    this.time = this.ingredients.length * 5;
  }
  calcHuniiToo() {
    this.huniiToo = 4;
  }
}

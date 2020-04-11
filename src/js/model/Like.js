// Like - товч дарагдах үеийн модел

export default class Likes {
  constructor() {
    // localStorage-д хадгалсан зүйл байвал likes массив руу бичнэ.
    this.readDataFromLocalStorage();
    // Лайкалсан жорыг хадгалах массив /likes - хоосон байвал хоосон массив үүсгэнэ/
    if (!this.likes) this.likes = [];
  }
  // Лайкалсан жорын өгөгдлийг авч, лайк-массивд хийх функц
  addLike(id, title, publisher, img) {
    // Лайкалсан жорын өгөгдөл
    const like = { id, title, publisher, img };
    // өгөгдлийг likes-массивд хийх
    this.likes.push(like);
    // localStorage-руу хадгална
    this.saveDataToLocalStorage();
    // Лайкалсан жорын өгөгдлийг буцаах
    return like;
  }
  // Лайкалсан жорыг устгах функц
  deleteLike(id) {
    // id-гэдэг ID-тэй Like-ийн индексийг массиваас хайж олно.
    const index = this.likes.findIndex((el) => el.id === id);
    // Уг индекс дээрх элементийг массиваас устгана
    this.likes.splice(index, 1);
    // localStorage-руу хадгална
    this.saveDataToLocalStorage();
  }
  // Жорууд лайклагдсан эсэхийг хянах функц /true-лайклагдаагүй  false-лайклагдсан/
  isLiked(id) {
    // Likes- массив дотор индекс нь байгаа эсэхийг шалгаж лайклагдсан эсэхийг мэднэ
    // if(this.likes.findIndex(el => el.id === id) === -1) return false
    // else return true;
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }
  // Нийт хэдэн элемент лайклагдсан байгааг олдог функц
  getNumberOfLikes() {
    return this.likes.length;
  }

  // Броузерын localStorage - руу хадгалдаг функц
  saveDataToLocalStorage() {
    // Likes - массивын өгөгдлийг тэмдэгт мөр болгож өгөх ёстой
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }
  //localStorage-д хадгалсан юм байвал түүнийг уншаад лайк-ын массив руу хийх
  readDataFromLocalStorage() {
    // localStorage-д string JSON өгөгдөл байгаа, түүнийг буцаагаад JS Object болгоно /parse()/
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}

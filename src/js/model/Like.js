// Like - товч дарагдах үеийн модел

export default class Likes {
  constructor() {
    // Лайкалсан жорыг хадгалах массив
    this.likes = [];
  }
  // Лайкалсан жорын өгөгдлийг авч, лайк-массивд хийх функц
  addLike(id, title, publisher, img) {
    // Лайкалсан жорын өгөгдөл
    const like = { id, title, publisher, img };
    // өгөгдлийг likes-массивд хийх
    this.likes.push(like);
    // Лайкалсан жорын өгөгдлийг буцаах
    return like;
  }
  // Лайкалсан жорыг устгах функц
  deleteLike(id) {
    // id-гэдэг ID-тэй Like-ийн индексийг массиваас хайж олно.
    const index = this.likes.findIndex((el) => el.id === id);
    // Уг индекс дээрх элементийг массиваас устгана
    this.likes.splice(index, 1);
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
}

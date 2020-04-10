// Найрлагны жагсаалт үүсгэх модел

import uniqid from "uniqid"; // Эндээс давхардахгүй id - өгөх функц оруулж ирнэ
export default class List {
  constructor() {
    // Найрлагнуудыг хадгалах массив
    this.items = [];
  }
  // item-жорыг гаднаас дамжуулахад items[]-руу хийж өгөх функц
  addItem(item) {
    let newItem = {
      id: uniqid(),
      item, // item: item - гэдгийн товч бичиглэл /ES6-аас үүссэн/
    };
    this.items.push(newItem);
    return newItem;
  }
  // Хадгалсан орцын листээс сонгосон орцыг устгах
  deleteItem(id) {
    // id-гэдэг ID-тэй орцын индексийг массиваас хайж олно.
    const index = this.items.findIndex((el) => el.id === id);
    // Уг индекс дээрх элементийг массиваас устгана
    this.items.splice(index, 1);
  }
}

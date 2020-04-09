// Найрлагны жагсаалт үүсгэх модел

export default class List {
  constructor() {
    // Найрлагнуудыг хадгалах массив
    this.items = [];
  }
  // item-жорыг гаднаас дамжуулахад items[]-руу хийж өгөх функц
  addItem(item) {
    this.items.push(item);
  }
}

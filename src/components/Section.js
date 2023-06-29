export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      this.appendItem(this.renderer(item));
    });
  }
  appendItem(element) {
    this._container.append(element);
  }
  prependItem(element) {
    this._container.prepend(element);
  }
  addItems(elements) {
    elements.forEach((element) => {
      this.renderer(element);
    });
  }
}

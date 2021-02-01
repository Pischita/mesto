export default class Section {
    constructor({
        items,
        renderer
    }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._items.forEach(item => {
            const element = this._renderer(item);
            this.addItem(element);
        });
    }

    addItem(element, toTheBegining = false) {
        if (toTheBegining) {
            this._container.prepend(element);
        } else {
            this._container.appendChild(element);
        }

    }
}
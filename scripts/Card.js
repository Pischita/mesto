class Card {
    constructor(data, selector, showImagePopup) {
        this.link = data.link;
        this.name = data.name;
        this._selector = selector;
        this._showImagePopup = showImagePopup;

    }

    _getTemplate() {
        const mestoTemplate = document.querySelector(this._selector);
        const mestoNode = mestoTemplate.content.cloneNode(true);
        return mestoNode;
    }

    _setLikeHandler(evt) {
        evt.target.classList.toggle('element__like-button_active');
    }

    _deleteHandeler(evt) {
        evt.target.closest('.element').remove();
    }


    _setEventListeners() {

        this._element.querySelector('.element__delete').addEventListener('click', this._deleteHandeler);
        this._element.querySelector('.element__like-button').addEventListener('click', this._setLikeHandler);
        this._element.querySelector('.element__image').addEventListener('click', this._showImagePopup);
    }

    generateCard() {
        this._element = this._getTemplate();
        const imgNode = this._element.querySelector('.element__image');
        imgNode.src = this.link;
        imgNode.alt = this.name;

        this._element.querySelector('.element__name').textContent = this.name;

        this._setEventListeners();

        return this._element;
    }
}

export {
    Card
}
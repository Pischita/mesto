import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._imgNode = this._container.querySelector('.popup__image');
        this._imagePopupTitle = this._container.querySelector('.popup__image-description');

    }

    open(imageSrc, text) {
        this._imgNode.src = imageSrc;
        this._imgNode.alt = text;
        this._imagePopupTitle.textContent = text;
        super.open();

    }

}
export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._container = document.querySelector(selector);
        this._closePopupBtn = this._container.querySelector('.popup__close-button');
        this.setEventListeners();
    }

    open() {
        this._container.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._container.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }

    }

    _handleOvelayClose = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this._closePopupBtn.addEventListener('click', () => this.close());
        this._container.addEventListener('click', this._handleOvelayClose);
    }
}
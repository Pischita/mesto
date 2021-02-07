export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._container = document.querySelector(selector);
        this._closePopupBtn = this._container.querySelector('.popup__close-button');
    }

    open() {
        this._container.classList.add('popup_opened');
        this.setEventListeners();

    }

    close = () => {
        this._container.classList.remove('popup_opened');

    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }

    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);

        this._closePopupBtn.addEventListener('click', this.close);

        this._container.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        });


    }
}
import Popup from './Popup.js';

export default class PopupModal extends Popup {
    constructor(selector) {
        super(selector);
        this._resolve = undefined;
        this._reject = undefined;
        this.setEventListeners();
    }

    open() {
        super.open();
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        })
    }


    setEventListeners = () => {
        super.setEventListeners();
        this._container.addEventListener('submit', this.submit);

        this._closePopupBtn.addEventListener('click', this.close);
    }

    submit = (evt) => {
        evt.preventDefault();
        this._container.classList.remove('popup_opened');
        this._resolve();
    }

    close() {
        super.close();
        this._reject();
    }




}
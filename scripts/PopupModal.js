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
    }

    submit = (evt) => {
        evt.preventDefault();

        this._resolve();
        this.close();
    }

    close() {
        super.close();
        this._reject();


    }




}
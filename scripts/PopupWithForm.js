import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this._submit = submit;
        this._inputList = this._container.querySelectorAll('.popup__field');
        this.setEventListeners();
        this._formValues = {};
        this.getInputValues();
        this.submitButton = this._container.querySelector('.popup__button');
    }

    getInputValues = () => {

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setInputValues(data) {
        if (typeof data == 'object') {
            for (let key in data) {
                const input = [...this._inputList].find(input => {
                    return input.name === key
                });
                if (input) {
                    input.value = data[key];
                    this._formValues[input.name] = data[key];
                }

            }
        }
    }

    // reset() {
    //     this._inputList.forEach(input => {
    //         this._formValues[input.name] = '';
    //         input.value = '';
    //     });
    // }


    close() {
        super.close();
        this._container.querySelector('form').reset();
    }


    setEventListeners() {
        super.setEventListeners();
        this._container.addEventListener('submit', this._submit);
    }

    setLoadingState() {
        this.submitButton.textContent = 'Сохранение...';
    }

    endLoadingState() {
        this.submitButton.textContent = 'Сохранить';
    }


}
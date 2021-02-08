export class FormValidator {
    constructor(form, settings) {
        this._form = form;
        this._settings = settings;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
    }

    enableValidation() {
        this._inputList.forEach(input => {
            input.addEventListener('input', (evt) => {
                this._validateField(input);
            });
        });
        this.validateForm();
    }

    validateForm = () => {
        const isValid = this._inputList.every(input => {
            return input.validity.valid;
        });

        if (isValid) {
            this._submitButton.classList.remove(this._settings.inactiveButtonClass);
            submitButton.removeAttribute('disabled');
        } else {
            this._submitButton.classList.add(this._settings.inactiveButtonClass);
            this._submitButton.setAttribute('disabled', true);
        }
    }

    _validateField = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

        if (inputElement.validity.valid) {
            errorElement.textContent = '';
            inputElement.classList.remove(this._settings.inputErrorClass);
        } else {
            errorElement.textContent = inputElement.validationMessage;
            inputElement.classList.add(this._settings.inputErrorClass);
        }
        this.validateForm();
    }

    _hideError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(this._settings.inputErrorClass);
    }

    resetValidation = () => {
        this._inputList.forEach(input => {
            this._hideError(input);
        });

        this.validateForm();
    }
}
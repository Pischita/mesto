class FormValidator {
    constructor(form, settings) {
        this._form = form;
        this._settings = settings;
    }

    eneableValidation() {
        this._form.querySelectorAll(this._settings.inputSelector).forEach(input => {
            input.addEventListener('input', (evt) => {
                this._validateField(evt.target);
            });

        });
        this._validateForm();
    }

    _validateForm() {
        const inputs = this._form.querySelectorAll(this._settings.inputSelector);
        const submitButton = this._form.querySelector(this._settings.submitButtonSelector);

        const isValid = Array.from(inputs).every(input => {
            return input.validity.valid;
        });

        if (isValid) {
            submitButton.classList.remove(this._settings.inactiveButtonClass);
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.classList.add(this._settings.inactiveButtonClass);
            submitButton.setAttribute('disabled', true);
        }
    }

    _validateField(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

        if (inputElement.validity.valid) {
            errorElement.textContent = '';
            inputElement.classList.remove(this._settings.inputErrorClass);
        } else {
            errorElement.textContent = inputElement.validationMessage;
            inputElement.classList.add(this._settings.inputErrorClass);
        }
        this._validateForm();
    }



}

export {
    FormValidator
}
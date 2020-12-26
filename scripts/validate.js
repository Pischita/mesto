const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_error',
    errorClass: 'popup__error_visible'
}

function validateForm(formElement, settings) {
    const inputs = formElement.querySelectorAll(settings.inputSelector);
    const submitButton = formElement.querySelector(settings.submitButtonSelector);

    const isValid = Array.from(inputs).every(input => {
        return input.validity.valid;
    });

    if (isValid) {
        submitButton.classList.remove(settings.inactiveButtonClass);
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.classList.add(settings.inactiveButtonClass);
        submitButton.setAttribute('disabled', true);
    }
}

function validateField(inputElement, formElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    if (inputElement.validity.valid) {
        errorElement.textContent = '';
        inputElement.classList.remove(settings.inputErrorClass);
    } else {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(settings.inputErrorClass);
    }
    validateForm(formElement, settings);
}

function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);

    Array.from(forms).forEach((form) => {
        form.querySelectorAll(settings.inputSelector).forEach(input => {
            input.addEventListener('input', (evt) => {
                validateField(evt.target, form, settings);
            });
        });
        validateForm(form, settings);
    });
}


enableValidation(settings);
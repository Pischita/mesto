//import '../pages/index.css';
import {
    Card
} from '../scripts/Card.js';

import {
    FormValidator
} from '../scripts/FormValidator.js';

import {
    initialCards
} from '../utils/data.js';

import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

const section = new Section({
    items: initialCards,
    renderer: createCard
}, '.elements');

const imagePopup = new PopupWithImage('.popup_name_imagePopup');
const editPopup = new PopupWithForm('.popup_name_edit', saveEditPopup);
const userInfo = new UserInfo('.profile__name', '.profile__position');
const addPopup = new PopupWithForm('.popup_name_add', addNewMesto);


const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const addForm = document.forms.add;
const formSet = new Map();

function createCard(item) {
    const card = new Card(item, '#mesto-element', showImagePopup);
    const cardElement = card.generateCard();
    return cardElement;

}

function showEditPopup(event) {
    editPopup.reset();
    if (formSet.has(document.forms.edit)) {
        formSet.get(document.forms.edit).resetValidation();
    }
    editPopup.setInputValues(userInfo.getUserInfo());
    editPopup.open();


}

function showAddPopup() {

    addPopup.reset();
    if (formSet.has(document.forms.add)) {
        formSet.get(document.forms.add).resetValidation();
    }

    addPopup.open();
}


function showImagePopup(evt) {
    imagePopup.open(evt.target.src, evt.target.alt);
}

function addNewMesto(evt) {
    evt.preventDefault();

    const mestoNode = createCard(addPopup.getInputValues());
    section.addItem(mestoNode, true);

    addPopup.close();

    const addForm = document.forms.add;
    addPopup.reset();
    if (formSet.has(addForm)) {
        formSet.get(addForm).validateForm();
    }

}

function saveEditPopup(event) {
    event.preventDefault();
    const formData = editPopup.getInputValues();
    userInfo.setUserInfo(formData);
    editPopup.close();
}

editBtn.addEventListener('click', showEditPopup);


addBtn.addEventListener('click', showAddPopup);

section.renderItems();


// VALIDATE 
const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_error',
    errorClass: 'popup__error_visible'
}


function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);

    Array.from(forms).forEach((form) => {
        const formValidator = new FormValidator(form, settings);
        formValidator.enableValidation();
        formSet.set(form, formValidator);
    });
}


enableValidation(settings);
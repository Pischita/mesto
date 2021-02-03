import {
    Card
} from './Card.js';

import {
    FormValidator
} from './FormValidator.js';

import {
    initialCards
} from './Data.js';

import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const section = new Section({
    items: initialCards,
    renderer: item => {
        const card = new Card(item, '#mesto-element', showImagePopup);
        const cardElement = card.generateCard();
        return cardElement;
    }
}, '.elements');

const imagePopup = new PopupWithImage('.popup_name_imagePopup');
const editPopup = new PopupWithForm('.popup_name_edit', saveEditPopup);

const userInfo = new UserInfo('.profile__name', '.profile__position');

const addPopup = new PopupWithForm('.popup_name_add', addNewMesto);

//const container = document.querySelector('.elements');








const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close-button');
const addForm = document.forms.add;

const nameInput = document.querySelector('.popup__field_name_name');

const positionInput = document.querySelector('.popup__field_name_position');
const formSet = {};




function showEditPopup(event) {
    // nameInput.value = ;
    // positionInput.value = ;
    editPopup.setInputValues(userInfo.getUserInfo());
    editPopup.open();

}

function showAddPopup() {
    // addForm.reset();
    // showPopup(addPopup);
    addPopup.open();
}


// function closePopup(popupElement) {
//     popupElement.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeByEscape);
// }

// function closeByEscape(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened')
//         closePopup(openedPopup);
//     }
// }


function showImagePopup(evt) {
    imagePopup.open(evt.target.src, evt.target.alt);
}

function addNewMesto(evt) {
    evt.preventDefault();

    let formData = addPopup.getInputValues();
    const mestoNode = new Card(formData, '#mesto-element', showImagePopup).generateCard();
    section.addItem(mestoNode, true);

    addPopup.close();

    // addForm.reset();
    // closePopup(addPopup);

    if (formSet[addForm]) {
        formSet[addForm].validateForm();
    }

}

function saveEditPopup(event) {
    event.preventDefault();

    const formData = editPopup.getInputValues();

    userInfo.setUserInfo(formData);

    editPopup.close();
}

editBtn.addEventListener('click', showEditPopup);
// closePopupBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         closePopup(btn.closest('.popup'));
//     });
// });

// document.forms.edit.addEventListener('submit', saveEditPopup);
// document.forms.add.addEventListener('submit', addNewMesto);


addBtn.addEventListener('click', showAddPopup);


// document.querySelectorAll('.popup').forEach((popup) => {
//     popup.addEventListener('click', (evt) => {
//         if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
//             closePopup(popup);
//         }
//     });
// });



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
        formSet[form] = formValidator;
    });
}


enableValidation(settings);
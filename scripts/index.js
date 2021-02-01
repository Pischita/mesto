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

const section = new Section({
    items: initialCards,
    renderer: item => {
        const card = new Card(item, '#mesto-element', showImagePopup);
        const cardElement = card.generateCard();
        return cardElement;
    }
}, '.elements');

//const container = document.querySelector('.elements');

const imagePopup = document.querySelector('.popup_name_imagePopup');
const imgNode = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__image-description');

const editPopup = document.querySelector('.popup_name_edit');
const addPopup = document.querySelector('.popup_name_add');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close-button');
const addForm = document.forms.add;
const nameNode = document.querySelector('.profile__name');
const nameInput = document.querySelector('.popup__field_name_name');
const positionNode = document.querySelector('.profile__position');
const positionInput = document.querySelector('.popup__field_name_position');
const formSet = {};




function showEditPopup(event) {
    nameInput.value = nameNode.textContent;
    positionInput.value = positionNode.textContent;
    showPopup(editPopup);
}

function showAddPopup() {
    addForm.reset();
    showPopup(addPopup);
}


function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

function showPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function showImagePopup(evt) {
    imgNode.src = evt.target.src;
    imgNode.alt = evt.target.alt;
    imagePopupTitle.textContent = evt.target.alt;
    showPopup(imagePopup);

}

function addNewMesto(evt) {
    evt.preventDefault();

    const name = addForm.querySelector('.popup__field_name_city').value;
    const link = addForm.querySelector('.popup__field_name_source-image').value;

    const mestoNode = new Card({
        name: name,
        link: link
    }, '#mesto-element', showImagePopup).generateCard();
    section.addItem(mestoNode, true);

    addForm.reset();
    closePopup(addPopup);

    if (formSet[addForm]) {
        formSet[addForm].validateForm();
    }

}

function saveEditPopup(event) {
    event.preventDefault();

    nameNode.textContent = nameInput.value;
    positionNode.textContent = positionInput.value;

    closePopup(editPopup);
}

editBtn.addEventListener('click', showEditPopup);
closePopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closePopup(btn.closest('.popup'));
    });
});

document.forms.edit.addEventListener('submit', saveEditPopup);
document.forms.add.addEventListener('submit', addNewMesto);


addBtn.addEventListener('click', showAddPopup);


document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});



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
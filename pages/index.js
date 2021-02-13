//import '../pages/index.css';
import {
    Card
} from '../scripts/Card.js';

import {
    FormValidator
} from '../scripts/FormValidator.js';



import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';




const imagePopup = new PopupWithImage('.popup_name_imagePopup');
const editPopup = new PopupWithForm('.popup_name_edit', saveEditPopup);
const userInfo = new UserInfo('.profile__name', '.profile__position', '.profile__avatar');
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

    api.saveUser(formData.name, formData.position)
        .then((data) => {
            userInfo.setUserInfo({
                name: data.name,
                position: data.about,
                id: data._id
            });
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            editPopup.close();
        });




}

editBtn.addEventListener('click', showEditPopup);


addBtn.addEventListener('click', showAddPopup);




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

// API 
const token = '55b21135-2418-4338-a05e-482937f04ba3';
const group = 'cohort-20';
const url = 'https://mesto.nomoreparties.co/v1/' + group + '/';

const api = new Api(url, token);

api.getUserName().then(data => {
        userInfo.setUserInfo({
            name: data.name,
            position: data.about,
            avatar: data.avatar,
            id: data._id
        });
    })
    .catch(err => {
        console.log(err)
    });


api.getCards()
    .then(data => {

        const section = new Section({
            items: data,
            renderer: createCard
        }, '.elements');
        section.renderItems();
    })
    .catch(err => {
        console.log(err)
    });
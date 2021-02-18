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
import PopupModal from '../scripts/PopupModal.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js';

const section = new Section({
    items: [],
    renderer: createCard
}, '.elements');




const imagePopup = new PopupWithImage('.popup_name_imagePopup');
const editPopup = new PopupWithForm('.popup_name_edit', saveEditPopup);
const avatarPopup = new PopupWithForm('.popup_name_avatar-edit', saveAvatar);
const userInfo = new UserInfo('.profile__name', '.profile__position', '.profile__avatar-image');
const addPopup = new PopupWithForm('.popup_name_add', addNewMesto);
const questionPopup = new PopupModal('.popup_name_question');


const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const editAvatarBtn = document.querySelector('.profile__avatar-edit');

const addForm = document.forms.add;
const formSet = new Map();

function createCard(item) {
    const card = new Card(item, '#mesto-element', showImagePopup, deletePlace, userInfo.getUserInfo(), likeHandler);
    const cardElement = card.generateCard();
    return cardElement;
}


function deletePlace(placeElement) {
    questionPopup.open()
        .then(() => {
            let id = placeElement.dataset.id;
            return api.deleteCard(id);
        }).then(() => {
            placeElement.remove();
        })
        .catch((err) => {


        });
}

function likeHandler(id, isLiked, updateHandler, element) {
    if (isLiked) {
        api.deleteLike(id)
            .then(data => {
                updateHandler(data.likes, element);
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        api.setLike(id)
            .then(data => {
                updateHandler(data.likes, element);
            })
            .catch(err => {
                console.log(err);
            });
    }

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

function showEditAvatar(evt) {
    evt.preventDefault();
    avatarPopup.reset();
    avatarPopup.open();
}

function showImagePopup(evt) {
    imagePopup.open(evt.target.src, evt.target.alt);
}

function addNewMesto(evt) {
    evt.preventDefault();

    const placeData = addPopup.getInputValues();

    api.saveCard(placeData.name, placeData.link)
        .then(data => {
            const mestoNode = createCard(data);
            section.addItem(mestoNode, true);
        }).catch(err => console.log(err))
        .finally(() => {
            addPopup.close();

            const addForm = document.forms.add;
            addPopup.reset();
            if (formSet.has(addForm)) {
                formSet.get(addForm).validateForm();
            }
        });
}

function saveEditPopup(event) {
    event.preventDefault();
    const formData = editPopup.getInputValues();

    api.saveUser(formData.name, formData.position)
        .then((data) => {
            userInfo.setUserInfo({
                name: data.name,
                position: data.about,
                avatar: data.avatar,
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

function saveAvatar(evt) {
    evt.preventDefault();
    const formData = avatarPopup.getInputValues();
    api.updateAvatar(formData.link)
        .then(data => {
            userInfo.setUserInfo({
                name: data.name,
                position: data.about,
                avatar: data.avatar,
                id: data._id
            });
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            avatarPopup.close();
        });

}



editBtn.addEventListener('click', showEditPopup);


addBtn.addEventListener('click', showAddPopup);


editAvatarBtn.addEventListener('click', showEditAvatar);


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
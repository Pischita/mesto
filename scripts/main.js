const editPopup = document.querySelector('.popup_name_edit');
const addPopup = document.querySelector('.popup_name_add');

let editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
let closePopupBtn = document.querySelectorAll('.popup__close-button');
let editForm = document.querySelector('.popup__container');
let nameNode = document.querySelector('.profile__name');
let nameInput = document.querySelector('.popup__field_name_name');

let positionNode = document.querySelector('.profile__position');
let positionInput = document.querySelector('.popup__field_name_position');

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


function showEditPopup(event) {
    nameInput.value = nameNode.textContent;
    positionInput.value = positionNode.textContent;
    editPopup.classList.add('popup_opened');
}

function showAddPopup() {
    addPopup.classList.add('popup_opened');
}

function closePopup(event) {
    event.target.closest('.popup').classList.remove('popup_opened');
}

function saveEditPopup(event) {
    event.preventDefault();

    if (event.target === document.forms.edit) {
        nameNode.textContent = nameInput.value;
        positionNode.textContent = positionInput.value;
    } else if (event.target === document.forms.add) {
        const name = event.target.querySelector('.popup__field_name_name').value;
        const link = event.target.querySelector('.popup__field_name_source-image').value;
        addElement({
            name: name,
            link: link
        });

    }

    closePopup(event);
}

function addElement(el) {
    const mestoTemplate = document.querySelector('#mesto-element');
    const container = document.querySelector('.elements');

    const mestoNode = mestoTemplate.content.cloneNode(true);
    const imgNode = mestoNode.querySelector('.element__image');
    imgNode.src = el.link;
    imgNode.alt = el.name;
    mestoNode.querySelector('.element__name').textContent = el.name;
    container.append(mestoNode);
}

function initializePage() {
    initialCards.forEach(item => {
        addElement(item);
    });
}

editBtn.addEventListener('click', showEditPopup);
closePopupBtn.forEach(btn => {
    btn.addEventListener('click', closePopup);
});

document.querySelectorAll('.popup__container').forEach(form => {
    form.addEventListener('submit', saveEditPopup);
});

addBtn.addEventListener('click', showAddPopup);
initializePage();
let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');
let editForm = document.querySelector('.popup__container');
let nameNode = document.querySelector('.profile__name');
let nameInput = document.querySelector('.popup__field_name_name');

let positionNode = document.querySelector('.profile__position');
let positionInput = document.querySelector('.popup__field_name_position');


function showPopup(event){
    nameInput.value = nameNode.textContent;
    positionInput.value = positionNode.textContent;
    popup.classList.add('popup_opened');
}

function closePopup(event){
    popup.classList.remove('popup_opened');
}

function savePopup(event){
    event.preventDefault();
    nameNode.textContent = nameInput.value;
    positionNode.textContent = positionInput.value;
    closePopup();
}


editBtn.addEventListener('click', showPopup);
closePopupBtn.addEventListener('click', closePopup);
editForm.addEventListener('submit', savePopup);

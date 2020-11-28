const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelector('.popup__close-button');
const editForm = document.querySelector('.popup__container');
const nameNode = document.querySelector('.profile__name');
const nameInput = document.querySelector('.popup__field[name="name"]');

const positionNode = document.querySelector('.profile__position');
const positionInput = document.querySelector('.popup__field[name="position"]');

editBtn.addEventListener('click', showPopup);
closePopupBtn.addEventListener('click', closePopup);
editForm.addEventListener('submit', savePopup);

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

    popup.classList.remove('popup_opened');


}
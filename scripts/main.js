const editPopup = document.querySelector('.popup_name_edit');
const addPopup = document.querySelector('.popup_name_add');
const mestoPopup = document.querySelector('.popup_name_mesto');
const container = document.querySelector('.elements');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closePopupBtn = document.querySelectorAll('.popup__close-button');
const addForm = document.forms.add;
const nameNode = document.querySelector('.profile__name');
const nameInput = document.querySelector('.popup__field_name_name');

const positionNode = document.querySelector('.profile__position');
const positionInput = document.querySelector('.popup__field_name_position');


function buildMestoNode(el) {
    const mestoTemplate = document.querySelector('#mesto-element');
    const mestoNode = mestoTemplate.content.cloneNode(true);
    const imgNode = mestoNode.querySelector('.element__image');
    imgNode.src = el.link;
    imgNode.alt = el.name;
    imgNode.addEventListener('click', showMestoPopup);

    mestoNode.querySelector('.element__name').textContent = el.name;
    mestoNode.querySelector('.element__like-button').addEventListener('click', setLikeHandler);
    mestoNode.querySelector('.element__delete').addEventListener('click', deleteHandeler);
    return mestoNode;
}

function showPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function showEditPopup(event) {
    nameInput.value = nameNode.textContent;
    positionInput.value = positionNode.textContent;
    showPopup(editPopup);
}

function showAddPopup() {
    showPopup(addPopup);
}

function showMestoPopup(evt) {
    const imgNode = mestoPopup.querySelector('.popup__image');
    imgNode.src = evt.target.src;
    imgNode.alt = evt.target.alt;

    mestoPopup.querySelector('.popup__image-description').textContent = evt.target.alt;
    showPopup(mestoPopup);

}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

function addNewMesto(evt) {
    evt.preventDefault();

    const name = event.target.querySelector('.popup__field_name_name').value;
    const link = event.target.querySelector('.popup__field_name_source-image').value;
    const mestoNode = buildMestoNode({
        name: name,
        link: link
    });
    container.prepend(mestoNode);
    evt.target.reset();
    closePopup(addPopup);

}

function saveEditPopup(event) {
    event.preventDefault();

    nameNode.textContent = nameInput.value;
    positionNode.textContent = positionInput.value;

    closePopup(editPopup);
}

function setLikeHandler(evt) {
    evt.target.classList.toggle('element__like-button_active');
}

function deleteHandeler(evt) {
    evt.target.closest('.element').remove();
}


function initializePage() {
    initialCards.forEach(item => {
        const mestoNode = buildMestoNode(item);
        container.append(mestoNode);

    });
}

editBtn.addEventListener('click', showEditPopup);
closePopupBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        closePopup(btn.closest('.popup'));
    });
});

addForm.querySelector('.popup__close-button').addEventListener('click', (evt) => {
    addForm.reset();
});

document.forms.edit.addEventListener('submit', saveEditPopup);
document.forms.add.addEventListener('submit', addNewMesto);


addBtn.addEventListener('click', showAddPopup);
initializePage();
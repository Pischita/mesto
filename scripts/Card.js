class Card {
    constructor(data, selector, showImagePopup, deleteHandler, userInfo) {
        this.link = data.link;
        this.name = data.name;
        this.likeCount = data.likes.length;
        this._selector = selector;
        this._showImagePopup = showImagePopup;
        this.id = data._id;
        this._delete = deleteHandler;

        if (userInfo && data.owner && data.owner._id === userInfo.id) {
            this._isOwner = true;
        } else {
            this._isOwner = false;
        }


    }

    _getTemplate() {
        const mestoTemplate = document.querySelector(this._selector);
        const mestoNode = mestoTemplate.content.cloneNode(true);
        return mestoNode;
    }

    _setLikeHandler(evt) {
        evt.target.classList.toggle('element__like-button_active');
    }

    _deleteHandeler = (evt) => {
        const container = evt.target.closest('.element');
        this._delete(container);
    }


    _setEventListeners() {
        const deleteBtn = this._element.querySelector('.element__delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', this._deleteHandeler);
        }

        this._element.querySelector('.element__like-button').addEventListener('click', this._setLikeHandler);
        this._element.querySelector('.element__image').addEventListener('click', this._showImagePopup);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element').setAttribute('data-id', this.id);
        const imgNode = this._element.querySelector('.element__image');
        imgNode.src = this.link;
        imgNode.alt = this.name;

        if (!this._isOwner) {
            this._element.querySelector('.element__delete').remove();
        }


        this._element.querySelector('.element__name').textContent = this.name;
        this._element.querySelector('.element__like-count').textContent = this.likeCount;

        this._setEventListeners();

        return this._element;
    }
}

export {
    Card
}
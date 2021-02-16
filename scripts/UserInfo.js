export default class UserInfo {
    constructor(nameSelector, positionSelector, avatarSelector) {
        this._nameNode = document.querySelector(nameSelector);
        this._positionNode = document.querySelector(positionSelector);
        this._avatarNode = document.querySelector(avatarSelector);

    }

    getUserInfo() {
        return {
            name: this._nameNode.textContent,
            position: this._positionNode.textContent,
            id: this.id
        }

    }

    setUserInfo({
        name,
        position,
        avatar,
        id
    }) {
        this._nameNode.textContent = name;
        this._positionNode.textContent = position;
        if (avatar) {
            this._avatarNode.src = avatar;
        }
        this.id = id;

    }
}
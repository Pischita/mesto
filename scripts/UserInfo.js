export default class UserInfo {
    constructor(nameSelector, positionSelector) {
        this._nameNode = document.querySelector(nameSelector);
        this._positionNode = document.querySelector(positionSelector);

    }

    getUserInfo() {

        return {
            name: this._nameNode.textContent,
            position: this._positionNode.textContent
        }

    }

    setUserInfo({
        name,
        position
    }) {
        this._nameNode.textContent = name;
        this._positionNode.textContent = position;

    }
}
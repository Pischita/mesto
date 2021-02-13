export default class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }

    _send(path) {
        return fetch(`${this._url}${path}`, {
                headers: {
                    authorization: this._token
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    Promise.reject(res.status + ' ' + res.statusText);
                }

            });

    }

    getUserName() {
        return this._send('users/me');

    }

    getCards() {
        return this._send('cards');
    }
}
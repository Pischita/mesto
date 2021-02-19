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

    saveUser(name, position) {
        return fetch(`${this._url}users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: position
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status + ' ' + res.statusText);
                }

            })
    }

    getCards() {
        return this._send('cards');
    }

    saveCard(name, link) {
        return fetch(`${this._url}cards`, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status + ' ' + res.statusText);
                }

            })

    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status + ' ' + res.statusText);
                }
            });
    }

    setLike(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status + ' ' + res.statusText);
                }

            });

    }

    deleteLike(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
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

    updateAvatar(link) {
        return fetch(`${this._url}users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status + ' ' + res.statusText);
                }

            });

    }
}
export default class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }



    getUserName() {
        return fetch(`${this._url}users/me`, {
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
}
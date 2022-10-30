const user = {
    login: function (token, user) {
        this.setToken(token);
        this.setUser(user);
    },

    setToken: function (value) {
        if (typeof window !== 'undefined')
            window.localStorage.setItem('token', value);
    },
    getToken: function () {
        return typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    },

    setUser: function (user) {
        const json = JSON.stringify(user);

        if (typeof window !== 'undefined')
            window.localStorage.setItem('user', json);
    },
    getUser: function () {
        return typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
    }
}

export default user;
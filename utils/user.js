const user = {
    login: function (token, user) {
        this.token = token;
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.photo = user.photo;

        console.log('user.login method::', this.token, this.id, this.name, this.email, this.photo);
    },
    get items() {
        return typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    },
    set items(value) {
        if (typeof window !== 'undefined')
            window.localStorage.setItem('token', value);
    }
}

export default user;
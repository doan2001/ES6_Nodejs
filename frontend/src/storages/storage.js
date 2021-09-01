
const storage = {
    getId() {
        let user = localStorage.getItem('user')
        user = user == null ? [] : JSON.parse(user)
        let account;
        if (user) {
            user.forEach((item) => {
                account = item
            })
            return account;
        }
    }
}

export default storage;
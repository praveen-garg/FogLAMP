import auth from '../auth'

export default {
    guest (to, from, next) {
        next(!auth.checkAuth())
    },

    auth (to, from, next) {
        next(auth.checkAuth() ? true : {
            path: '/login',
            query: {
                redirect: to.name
            }
        })
    }
}

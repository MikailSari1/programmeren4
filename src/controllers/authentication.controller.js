//
// Authentication controller
//
import { debug } from '../util/logger.js'
import { login as _login } from '../services/authentication.service.js'

const authController = {
    login: (req, res, next) => {
        const userCredentials = req.body
        debug('login', userCredentials)
        _login(userCredentials, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                })
            }
        })
    }
}

export default authController
//
// Authentication controller
//
// import { sign } from 'jsonwebtoken'
import jwt from 'jsonwebtoken';

const sign = jwt.sign;

import { getConnection } from '../dao/mysql-db.js'
// const validateEmail = require('../util/emailvalidator')
import { debug, error as _error, info } from '../util/logger.js'
import { secretkey as jwtSecretKey } from '../util/config.js'

const authController = {
    login: (userCredentials, callback) => {
        debug('login')

        getConnection((err, connection) => {
            if (err) {
                _error(err)
                callback(err.message, null)
            }
            if (connection) {
                // 1. Kijk of deze useraccount bestaat.
                connection.query(
                    'SELECT `id`, `emailAdress`, `password`, `firstName`, `lastName` FROM `user` WHERE `emailAdress` = ?',
                    [userCredentials.emailAdress],
                    (err, rows, fields) => {
                        connection.release()
                        if (err) {
                            _error('Error: ', err.toString())
                            callback(error.message, null)
                        }
                        if (rows) {
                            // 2. Er was een resultaat, check het password.
                            if (
                                rows &&
                                rows.length === 1 &&
                                rows[0].password == userCredentials.password
                            ) {
                                debug(
                                    'passwords DID match, sending userinfo and valid token'
                                )
                                // Extract the password from the userdata - we do not send that in the response.
                                const { password, ...userinfo } = rows[0]
                                // Create an object containing the data we want in the payload.
                                const payload = {
                                    userId: userinfo.id
                                }

                                sign(
                                    payload,
                                    jwtSecretKey,
                                    { expiresIn: '12d' },
                                    (err, token) => {
                                        info(
                                            'User logged in, sending: ',
                                            userinfo
                                        )
                                        callback(null, {
                                            status: 200,
                                            message: 'User logged in',
                                            data: { ...userinfo, token }
                                        })
                                    }
                                )
                            } else {
                                debug(
                                    'User not found or password invalid'
                                )
                                callback(
                                    {
                                        status: 409,
                                        message:
                                            'User not found or password invalid',
                                        data: {}
                                    },
                                    null
                                )
                            }
                        }
                    }
                )
            }
        })
    },

    login2: (req, res, next) => {
        dbconnection.getConnection((err, connection) => {
            if (err) {
                _error('Error getting connection from dbconnection')
                return next({
                    status: err.status,
                    message: error.message,
                    data: {}
                })
            }
            if (connection) {
                // 1. Kijk of deze useraccount bestaat.
                connection.query(
                    'SELECT `id`, `emailAdress`, `password`, `firstName`, `lastName` FROM `user` WHERE `emailAdress` = ?',
                    [req.body.emailAdress],
                    (err, rows, fields) => {
                        connection.release()
                        if (err) {
                            _error('Error: ', err.toString())
                            return next({
                                status: err.status,
                                message: error.message,
                                data: {}
                            })
                        }
                        if (rows) {
                            // 2. Er was een resultaat, check het password.
                            if (
                                rows &&
                                rows.length === 1 &&
                                rows[0].password == req.body.password
                            ) {
                                info(
                                    'passwords DID match, sending userinfo and valid token'
                                )
                                // Extract the password from the userdata - we do not send that in the response.
                                const { password, ...userinfo } = rows[0]
                                // Create an object containing the data we want in the payload.
                                const payload = {
                                    userId: userinfo.id
                                }

                                sign(
                                    payload,
                                    jwtSecretKey,
                                    { expiresIn: '12d' },
                                    function (err, token) {
                                        debug(
                                            'User logged in, sending: ',
                                            userinfo
                                        )
                                        res.status(200).json({
                                            statusCode: 200,
                                            results: { ...userinfo, token }
                                        })
                                    }
                                )
                            } else {
                                info(
                                    'User not found or password invalid'
                                )
                                return next({
                                    status: 409,
                                    message:
                                        'User not found or password invalid',
                                    data: {}
                                })
                            }
                        }
                    }
                )
            }
        })
    }
}

export default { authController, login }
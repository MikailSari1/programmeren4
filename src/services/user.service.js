import database from '../dao/inmem-db.js'
// const tracer = require('tracer');

const userService = {
    create: (user, callback) => {
       // logger.info('create user', user)
        database.create(user, (err, data) => {
            if (err) {
                logger.info(
                    'error creating user: ',
                    err.message || 'unknown error'
                )
                callback(err, null)
            } else {
              //  logger.trace(`User created with id ${data.id}.`)
                callback(null, {
                    message: `User created with id ${data.id}.`,
                    data: data
                })
            }
        })
    },

    getAll: (callback) => {
        database.getAll((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                console.log(data)
                callback(null, {
                    message: `Found ${data.length} users.`,
                    data: data
                })
            }
        })
    },

    getById: (id, callback) => {
        database.getById(id, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    message: `Found user with id ${id}.`,
                    data: data
                });
            }
        })
    },

    update: (id, user, callback) => {
        database.update(id, user, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {
                    message: `User updated with id ${id}`,
                    data: data
                })
            }
        })
    },

    delete: (id, callback) => {
        database.delete(id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null), {
                    message: `User deleted with id ${id}`,
                    data: data
                }
            }
        })
    }
}

export default userService

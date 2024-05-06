import userService from '../services/user.service.js';
import userRoutes from '../routes/user.routes.js';
// const tracer = require('tracer');
// import logger from '../util/logger.js';

let userController = {
    create: (req, res, next) => {
        const user = req.body
       // logger.info('create user', user.firstName, user.lastName)
        userService.create(user, (error, success) => {
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
    },

    getAll: (req, res, next) => {
       // logger.trace('getAll')
        userService.getAll((error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },

    getById: (req, res, next) => {
        const userId = req.params.userId
     //  logger.trace('userController: getById', userId)
        userService.getById(userId, (error, success) => {
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
    },

    // Todo: Implement the update and delete methods

   update: (req, res, next) => {
   // const userId = req.params.userId;
    const newUser = database._data.find((u) => u.id == userId);
   userService.update(userId, (error, success) => {
    if (user) {
        const index = database.user.indexOf(user);
        const newUser = req.body;
        newUser.Id = userId;
        database.data[index] = newUser;
        res.status(200).json({
            status: 200,
            message: "User updated succesfully!",
            data: newUser
        });
        return;
    }
   })
},

   delete: (req, res, next) => {
    const user = database.data.find((u) => u.id == req.params.userId);
    userService.delete(user, (error, success) => {
    if (user) {
        const index = database.data.indexOf(user);
        database.data.splice(index, 1);
        res.status(200).json ({
            status: 200,
            message: "User deleted succesfully!",
            data: database.data
        });
        return;
    }
})
   }
   
}

export default userController

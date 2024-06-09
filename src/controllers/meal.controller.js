import mealService from '../services/meal.service.js';

let mealController = {
    createMeal: (req, res, next) => {
        const meal = req.body;
        mealService.create(meal, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },

    getAllMeals: (req, res, next) => {
        mealService.getAll((error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },

    getByMealId: (req, res, next) => {
        const mealId = req.params.mealId;
        mealService.getById(mealId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },

    // update: (req, res, next) => {
    //     const mealId = req.params.mealId;
    //     const meal = req.body;
    //     mealService.update(mealId, meal, (error, success) => {
    //         if (error) {
    //             return next({
    //                 status: error.status,
    //                 message: error.message,
    //                 data: {}
    //             });
    //         }
    //         if (success) {
    //             res.status(200).json({
    //                 status: 200,
    //                 message: "Meal updated successfully!",
    //                 data: success.data
    //             });
    //         }
    //     });
    // },

    deleteMeal: (req, res, next) => {
        const mealId = req.params.mealId;
        mealService.delete(mealId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: "Meal deleted successfully!",
                    data: success.data
                });
            }
        });
    }
};

export default mealController;

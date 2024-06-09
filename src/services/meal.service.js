// import db from '../dao/mysql-db.js';

// const mealService = {
//     create: (meal, callback) => {
//         db.query('INSERT INTO `meal` SET ?', meal, (error, results, fields) => {
//             if (error) {
//                 console.error('Error creating meal:', error);
//                 callback(error, null);
//             } else {
//                 console.log('Meal created successfully');
//                 callback(null, {
//                     message: 'Meal created successfully',
//                     data: results
//                 });
//             }
//         });
//     },

//     getAll: (callback) => {
//         db.query('SELECT name, description FROM `meal`;', (error, results, fields) => {
//             if (error) {
//                 console.error('Error getting meals:', error);
//                 callback(error, null);
//             } else {
//                 console.log('Meals retrieved successfully');
//                 callback(null, {
//                     message: `Found ${results.length} meals.`,
//                     data: results
//                 });
//             }
//         });
//     },

//     getById: (id, callback) => {
//         db.query('SELECT * FROM `meal` WHERE id = ?', [id], (error, results, fields) => {
//             if (error) {
//                 console.error('Error getting meal by id:', error);
//                 callback(error, null);
//             } else {
//                 console.log('Meal retrieved successfully');
//                 callback(null, {
//                     message: `Found meal with id ${id}.`,
//                     data: results
//                 });
//             }
//         });
//     },

//     // update: (id, meal, callback) => {
//     //     db.query('UPDATE `meal` SET ? WHERE id = ?', [meal, id], (error, results, fields) => {
//     //         if (error) {
//     //             console.error('Error updating meal:', error);
//     //             callback(error, null);
//     //         } else {
//     //             console.log('Meal updated successfully');
//     //             callback(null, {
//     //                 message: `Meal updated with id ${id}`,
//     //                 data: results
//     //             });
//     //         }
//     //     });
//     // },

//     delete: (id, callback) => {
//         db.query('DELETE FROM `meal` WHERE id = ?', [id], (error, results, fields) => {
//             if (error) {
//                 console.error('Error deleting meal:', error);
//                 callback(error, null);
//             } else {
//                 console.log('Meal deleted successfully');
//                 callback(null, {
//                     message: `Meal deleted with id ${id}`,
//                     data: results
//                 });
//             }
//         });
//     }
// };

// export default mealService;


import db from '../dao/mysql-db.js';
// import { error as _error } from '../util/logger.js';

const mealService = {
    create: (meal, callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query(
                'INSERT INTO `meal` SET ?',
                meal,
                (error, results, fields) => {
                    connection.release();

                    if (error) {
                        _error(error);
                        callback(error, null);
                    } else {
                        callback(null, {
                            message: 'Meal created successfully',
                            data: results
                        });
                    }
                }
            );
        });
    },

    getAll: (callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query('SELECT name, description FROM `meal`', (error, results, fields) => {
                connection.release();

                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `Found ${results.length} meals.`,
                        data: results
                    });
                }
            });
        });
    },

    getById: (id, callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM `meal` WHERE id = ?', [id], (error, results, fields) => {
                connection.release();

                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `Found meal with id ${id}.`,
                        data: results
                    });
                }
            });
        });
    },

    delete: (id, callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query('DELETE FROM `meal` WHERE id = ?', [id], (error, results, fields) => {
                connection.release();

                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `Meal deleted with id ${id}`,
                        data: results
                    });
                }
            });
        });
    }
};

export default mealService;

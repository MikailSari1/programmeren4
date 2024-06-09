// import db from '../dao/mysql-db.js';

// const userService = {
//     create: (user, callback) => {
//         logger.info('Creating user:', user);
    
//         // Verbinding maken met de MySQL database
//         db.getConnection(function (err, connection) {
//             if (err) {
//                 logger.error(err);
//                 callback(err, null);
//                 return;
//             }
    
//             // Query om de hoogste ID op te halen
//             connection.query(
//                 'SELECT MAX(id) AS maxId FROM `user`',
//                 function (error, results, fields) {
//                     if (error) {
//                         connection.release();
//                         logger.error(error);
//                         callback(error, null);
//                         return;
//                     }
    
//                     // Berekenen van het nieuwe ID
//                     const newId = results[0].maxId + 1;
    
//                     // Uitvoeren van een query om een nieuwe gebruiker toe te voegen met het nieuwe ID
//                     connection.query(
//                         'INSERT INTO `user` SET ?',
//                         {
//                             id: newId,
//                             firstName: user.firstName,
//                             lastName: user.lastName,
//                             emailAdress: user.emailAddress,
//                             password: user.password,
//                             isActive: user.isActive,
//                             street: user.street,
//                             city: user.city,
//                             phoneNumber: user.phoneNumber,
//                             roles: JSON.stringify(user.roles) // Convert the roles-array to a JSON-string
//                         },
//                         function (error, results, fields) {
//                             connection.release();
    
//                             if (error) {
//                                 logger.error(error);
//                                 callback(error, null);
//                             } else {
//                                 logger.debug(results);
//                                 callback(null, {
//                                     message: `User created with id ${newId}.`,
//                                     data: { ...user, id: newId }
//                                 });
//                             }
//                         }
//                     );
//                 }
//             );
//         });
//     },

//     getAll: (callback) => {
//         db.query('SELECT id, firstName, lastName FROM `user`', (error, results, fields) => {
//             if (error) {
//                 console.error('Error getting users:', error);
//                 callback(error, null);
//             } else {
//                 console.log('Users retrieved successfully');
//                 callback(null, {
//                     message: `Found ${results.length} users.`,
//                     data: results
//                 });
//             }
//         });
//     },

//     getProfile: (userId, callback) => {
//         db.query(
//             'SELECT id, firstName, lastName FROM `user` WHERE id = ?',
//             [userId],
//             (error, results, fields) => {
//                 if (error) {
//                     console.error('Error getting user profile:', error);
//                     callback(error, null);
//                 } else {
//                     console.log('User profile retrieved successfully');
//                     callback(null, {
//                         message: `Found ${results.length} user.`,
//                         data: results
//                     });
//                 }
//             }
//         );
//     },

//     getAllActive: (callback) => {
//         db.query('SELECT * FROM `user` WHERE active = true', (error, results, fields) => {
//             if (error) {
//                 console.error('Error getting active users:', error);
//                 callback(error, null);
//             } else {
//                 console.log('Active users retrieved successfully');
//                 callback(null, {
//                     message: `Found ${results.length} active users.`,
//                     data: results
//                 });
//             }
//         });
//     },

//     getAllInactive: (callback) => {
//         db.query('SELECT * FROM `user` WHERE active = false', (error, results, fields) => {
//             if (error) {
//                 console.error('Error getting inactive users:', error);
//                 callback(error, null);
//             } else {
//                 console.log('Inactive users retrieved successfully');
//                 callback(null, {
//                     message: `Found ${results.length} inactive users.`,
//                     data: results
//                 });
//             }
//         });
//     },

//     getById: (id, callback) => {
//         db.query('SELECT * FROM `user` WHERE id = ?', [id], (error, results, fields) => {
//             if (error) {
//                 console.error('Error getting user by id:', error);
//                 callback(error, null);
//             } else {
//                 console.log('User retrieved successfully');
//                 callback(null, {
//                     message: `Found user with id ${id}.`,
//                     data: results
//                 });
//             }
//         });
//     },

//     update: (id, user, callback) => {
//         db.query('UPDATE `user` SET ? WHERE id = ?', [user, id], (error, results, fields) => {
//             if (error) {
//                 console.error('Error updating user:', error);
//                 callback(error, null);
//             } else {
//                 console.log('User updated successfully');
//                 callback(null, {
//                     message: `User updated with id ${id}`,
//                     data: results
//                 });
//             }
//         });
//     },

//     delete: (id, callback) => {
//         db.query('DELETE FROM `user` WHERE id = ?', [id], (error, results, fields) => {
//             if (error) {
//                 console.error('Error deleting user:', error);
//                 callback(error, null);
//             } else {
//                 console.log('User deleted successfully');
//                 callback(null, {
//                     message: `User deleted with id ${id}`,
//                     data: results
//                 });
//             }
//         });
//     }
// };

// export default userService;

// import db from '../dao/mysql-db.js';
import db from '../dao/mysql-db.js';

// import getConnection from '../dao/mysql-db.js';
// import { error as _error } from '../util/logger.js';

const userService = {
    create: (user, callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query(
                'INSERT INTO `user` SET ?',
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailAddress: user.emailAddress,
                    password: user.password,
                    isActive: user.isActive,
                    street: user.street,
                    city: user.city,
                    phoneNumber: user.phoneNumber,
                    roles: JSON.stringify(user.roles)
                },
                (error, results, fields) => {
                    connection.release();

                    if (error) {
                        _error(error);
                        callback(error, null);
                    } else {
                        callback(null, {
                            message: 'User created successfully',
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

            connection.query('SELECT id, firstName, lastName FROM `user`', (error, results, fields) => {
                connection.release();
                
                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `Found ${results.length} users.`,
                        data: results
                    });
                }
            });
        });
    },

    getProfile: (userId, callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query(
                'SELECT id, firstName, lastName FROM `user` WHERE id = ?',
                [userId],
                (error, results, fields) => {
                    connection.release();

                    if (error) {
                        _error(error);
                        callback(error, null);
                    } else {
                        callback(null, {
                            message: `Found ${results.length} user.`,
                            data: results
                        });
                    }
                }
            );
        });
    },

    getAllActive: (callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM `user` WHERE active = true', (error, results, fields) => {
                connection.release();

                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `Found ${results.length} active users.`,
                        data: results
                    });
                }
            });
        });
    },

    getAllInactive: (callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query('SELECT * FROM `user` WHERE active = false', (error, results, fields) => {
                connection.release();

                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `Found ${results.length} inactive users.`,
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

            connection.query('SELECT * FROM `user` WHERE id = ?', [id], (error, results, fields) => {
                connection.release();

                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `Found user with id ${id}.`,
                        data: results
                    });
                }
            });
        });
    },

    update: (id, user, callback) => {
        db.getConnection((err, connection) => {
            if (err) {
                _error(err);
                callback(err, null);
                return;
            }

            connection.query('UPDATE `user` SET ? WHERE id = ?', [user, id], (error, results, fields) => {
                connection.release();

                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `User updated with id ${id}`,
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

            connection.query('DELETE FROM `user` WHERE id = ?', [id], (error, results, fields) => {
                connection.release();

                if (error) {
                    _error(error);
                    callback(error, null);
                } else {
                    callback(null, {
                        message: `User deleted with id ${id}`,
                        data: results
                    });
                }
            });
        });
    }
};

export default userService;

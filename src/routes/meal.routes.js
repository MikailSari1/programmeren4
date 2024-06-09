import { Router } from 'express';
import { expect } from 'chai';
import mealController from '../controllers/meal.controller.js';

const router = Router();

// Tijdelijke functie om niet bestaande routes op te vangen
const notFound = (req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    });
};

const validateMealCreateChaiExpect = (req, res, next) => {
    try {
        expect(req.body.name, 'Missing or incorrect name field').to.not.be.empty;
        expect(req.body.name).to.be.a('string');
        // expect(req.body.description, 'Missing or incorrect description field').to.not.be.empty;
        // expect(req.body.description).to.be.a('string');
        // expect(req.body.price, 'Missing or incorrect price field').to.not.be.empty;
        // expect(req.body.price).to.be.a('number');
        console.log('Meal successfully validated');
        next();
    } catch (ex) {
        console.error('Meal validation failed:', ex.message);
        next({
            status: 400,
            message: ex.message,
            data: {}
        });
    }
};

// Mealroutes

// create meal route
router.post('/api/meal', validateMealCreateChaiExpect, mealController.createMeal);

// getter routes
router.get('/api/meal', mealController.getAllMeals);
router.get('/api/meal/:mealId', mealController.getByMealId);

// delete meal route
router.delete('/api/meal/:mealId', mealController.deleteMeal);

// Tijdelijke routes om niet bestaande routes op te vangen
router.put('/api/meal/:mealId', notFound);
router.delete('/api/meal/:mealId', notFound);

export default router;

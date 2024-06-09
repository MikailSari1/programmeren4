import express, { json } from 'express'
import userRoutes from './src/routes/user.routes.js'
import mealRoutes from './src/routes/meal.routes.js'
import authenticationRoutes from './src/routes/authentication.routes.js'
// import database from '../dao/inmem-db.js';
// const express = require("express");



const app = express()
app.use(express.json());
app.use(mealRoutes);
app.use(authenticationRoutes);


// express.json zorgt dat we de body van een request kunnen lezen
app.use(json())

const port = process.env.PORT || 3000

app.all('*', (req, res, next) => {
    console.log('Request:', req.method, req.url)
    next()
})

app.get('/', function (req, res) {
    res.json({ message: 'Hello World' })
})

app.get('/api/info', (req, res) => {
    console.log('GET /api/info')
    const info = {
        name: 'My Nodejs Express server',
        version: '0.0.1',
        description: 'This is a simple Nodejs Express server'
    }
    res.json(info)
})

// Hier komen alle routes
app.use(userRoutes)

// Hier komt de route error handler te staan!
app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    })
})

// Hier komt je Express error handler te staan!
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
        data: {}
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Deze export is nodig zodat Chai de server kan opstarten
export default app

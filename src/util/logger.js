//
// Application configuration
//
require('dotenv').config()

// Set the logging level.
const loglevel = process.env.LOGLEVEL

const logger = require('tracer').colorConsole({
    format: ['{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}'],
    preprocess: function (data) {
        data.title = data.title.toUpperCase()
    },
    dateformat: 'isoUtcDateTime',
    level: loglevel
})

// logger.js

function debug(message) {
    console.debug('[DEBUG]', message);
}

function error(message) {
    console.error('[ERROR]', message);
}

function info(message) {
    console.info('[INFO]', message);
}

export { debug, error, info };


export default logger
﻿// Load environment variables from .env file if present
require('dotenv').config();
const express = require('express');
const path = require('path');
const next = require('next');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('./routes/users/_helpers/jwt');
const errorHandler = require('./routes/users/_helpers/error-handler');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
    dir: '.',
    dev
});
const handle = nextApp.getRequestHandler(); //part of next config

process.on('uncaughtException', function (err) {
    console.error('Uncaught Exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason);
});

// Default mode with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' and dev port to '4000'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.PORT = process.env.PORT || 80

nextApp.prepare().then(() => {
    // express code here
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // To parse cookie on request
    app.use(cookieParser());

    // use JWT auth to secure the api
    // app.use(jwt());

    // Serve fonts from ionicon npm module
    app.use('/fonts/ionicons', express.static(path.join(__dirname, '../node_modules/ionicons/dist/fonts')));

    // api routes
    app.use('/users', jwt(), require('./routes/users/users.controller'));

    // global error handler
    app.use(errorHandler);

    app.use('/api/photos', require('./routes/photos'));

    // Default catch-all handler to allow Next.js to handle all other routes
    app.get('*', (req, res) => {
        return handle(req, res); // for all the react stuff
    });

    // Starting server
    const server = app.listen(process.env.PORT, function () {
        console.log('Server listening on port ' + process.env.PORT);
    });
});


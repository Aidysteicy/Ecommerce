
import rutaLogin from './src/routes/sessionRoute.js';
import express, { json, urlencoded } from 'express';
import handlebars from 'express-handlebars'
const app = express();
import passport from 'passport';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash'
import session from 'express-session'

import MongStore from 'connect-mongo'
import {config} from './config.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/*
const MongStore = require('connect-mongo');
const configMongo = require('./src/config/configMongo.js')
const passport = require('./src/utils/passport')
*/
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/src/views/layouts',
    partialsDir: __dirname + '/src/views/partials'
}))
//********************************************//

app.set('views', './src/views')
app.set('view engine', 'hbs')

app.use(json());
app.use(urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: MongStore.create({mongoUrl: config.mongodb.cnxStr, mongoOptions: config.mongodb.options})
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(rutaLogin)

export default app
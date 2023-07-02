require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { createUser, login, logout } = require('./controllets/users');
const serverError = require('./errors/error-server');
const auth = require('./middlewares/auth');
const { singUpValidation, singInValidation } = require('./middlewares/validators');
const { DB_ADDRESS } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.connect(DB_ADDRESS);

app.use(requestLogger);
app.use(cors);

app.post('/signin', singInValidation, login);
app.post('/signup', singUpValidation, createUser);
app.post('/signout', logout);
app.use(auth);
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(serverError);

app.listen(PORT, () => console.log('App listening on port {PORT}'));

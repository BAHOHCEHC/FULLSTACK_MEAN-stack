const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const cors = require('cors'); //что бы сервер мог обрабатывать CORS запросы независимо от домена на котором находиться клиент
const morgan = require('morgan'); //для красивого логирования запросов
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth');
const analyticRoutes = require('./routes/analytic');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log('****MONGO CONECTED****');
  })
  .catch(error => {
    console.log('********', error);
  });

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/analytic', analyticRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);
module.exports = app;

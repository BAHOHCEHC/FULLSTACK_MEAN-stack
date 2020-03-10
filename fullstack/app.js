const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
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
	.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
	.then(() => {
		console.log('****MONGO CONECTED****');
	})
	.catch(error => {
		console.log('*****ERROR***', error);
	});

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(require('cors')());
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

if (procces.env.NODE_ENV === 'production') {
	app.use(express.static('client/dist/client'));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + 'client/dist/client/index.html'));
		// res.sendFile(path.resolve(__dirname, 'client', 'dist', 'client', 'index.html'));
	});
}

module.exports = app;

const path = require('path');
const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');

const app = express();

//conecting to db
mongoose
	.connect(
		'mongodb+srv://db_alonso:db_alonso12@cluster0.cwmh9.mongodb.net/crud-mongodb?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then((db) => console.log('DB connected'))
	.catch((err) => console.log(err));

//import routes
const indexRoutes = require('./routes/index');
//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname +  '/views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // Para entender los datos que llegan del formulario

//routes
app.use('/', indexRoutes);

//starting server
app.listen(app.get('port'), () => {
	console.log('Server on ' + app.get('port'));
});

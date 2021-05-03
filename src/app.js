const path = require('path');
const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose'); // Requerimos mongoose

const app = express();

//CONECTAMOS A LA DB DE ESTA FORMA

try {
	mongoose.connect( 
		//El primer parametro es el link de conexion a la DB, este link es de MongoDB Atlas , un servicio de MongoDB en la Nube creada por los mismos de MongoDB
		'mongodb+srv://db_alonso:db_alonso12@cluster0.cwmh9.mongodb.net/crud-mongodb?retryWrites=true&w=majority',
		{
			useNewUrlParser: true, // Para parsear el usuario para MongoDB
			useUnifiedTopology: true, // Para que maneje correctamente el monitoreo de cluster 
		},
		() => console.log('DB conectada correctamente') // Si se conecto, se ejecuta este cb
	);
} catch (error) {
	console.log(error);
}

//import routes
const indexRoutes = require('./routes/index');
//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
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

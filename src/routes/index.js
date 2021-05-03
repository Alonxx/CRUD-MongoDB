const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => { // Ruta principal
	const tasks = await Task.find(); //Buscamos todos los Task en la DB
	res.render('index', {tasks}); // renderizamos con los Task que encuentre
});

router.post('/add', async (req, res) => {//ruta para la accion de agregar un task
	const task = new Task(req.body); // Creamos una nueva instancia del modelo Tasks con los datos que nos llegan del body. (Title, Description)
	await task.save(); // Creamos un nuevo task en la base de datos
	res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {// ruta para marcar como 'done' la Task
	const {id} = req.params;

	const task = await Task.findById(id); // Buscamos un elemento en la DB por su ID

	task.status = !task.status; // Con esto cambiamos el value de una propiedad, en este caso la propiedad status pasa a true o false segun sea el caso

	await task.save(); // Guardamos en la DB

	res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {// ruta del formulario para editar una Task
	const {id} = req.params;
	const task = await Task.findById(id); // Buscamos un elemento en la DB por su ID

	res.render('edit', {task});
});

router.post('/edit/:id', async (req, res) => { // ruta para la accion de editar la Task
	const {id} = req.params;
	await Task.updateOne({_id: id}, req.body); // Para actualizar una Task, Task.updateOne("Elemento a actualizar", "Lo que se le va a actualizar")
	res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {//Ruta para la accion eliminar una Task
	const {id} = req.params;
	await Task.deleteOne({_id: id}); // Removemos una Task pasandole el id que llego por params. (los atributos agregados por mongoose empiezan con _ por eso es _id que la genero mongoose automaticamente)
	res.redirect('/');
});

module.exports = router;

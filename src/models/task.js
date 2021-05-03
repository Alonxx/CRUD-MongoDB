const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({ //Esquema (modelo)
	title: String,
	description: String,
	status: { //Colocar datos por defecto
        type: Boolean,
        default: false 
    },
});

// le decimos a mongoose que ese sera nuestro modelo para guardar datos dentro de las collection de mongoDB y lo exportamos para poder usarlo
module.exports = mongoose.model('tasks',TaskSchema);
/*
Import du composant Mongoose
*/
    const mongoose = require('mongoose');  
// 

/*
Création du Schema
*/
    const TaskSchema = new mongoose.Schema({
        state: Boolean,
        content: String
    })
//

/*
Création du model
*/
    mongoose.model( 'Task', TaskSchema );
//

/*
Exporter le module
*/
    module.exports = mongoose.model('Task');
// 
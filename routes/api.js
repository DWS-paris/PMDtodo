
/*
Import des composants de la route
*/
    // Class
    var express = require('express');
    var router = express.Router();
    const bodyParser = require('body-parser');

    // Module
    const mongoose = require('mongoose');
    const ObjectId = mongoose.Schema.Types.ObjectId;
    const MongooseTask = require('../models/task.mongoose');

    // Middleware
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
// 


/*
Définition des routes
*/
    // Afficher les tâches
    router.get('/tasks', (req, res) => {

        mongoose.connect(process.env.MONGO_HOST, (err, db) => {
            // Tester la connection
            if(err) { res.send(err) } 
            else{
                // Afficher les documents de la colletion myRecipe
                db.collection('tasks').find().toArray((err, tasks) => {
                    // Tester la commande MongoDb
                    if(err){ res.json( { err }) }
                    else{ 
                        // Envoyer les données au format json
                        res.json( { tasks } )
                    }
                })
            };
            // Fermer la connexion
            db.close();
        });
    });
    
    // Ajouter une tâche
    router.post('/add-task', (req, res) => {
        // Utiliser le module MongoosePost pour ajouter une entrée dans le BDD
        MongooseTask.create({
            state: false,
            content: req.body.content
        },
        
        // Fonction de CB
        (err, data) => {
            // Error
            if(err) return res.json( err );

            // Success
            res.json(data)
        });
    });

    // Supprimer une tâche
    router.post('/delete-task/:id', (req, res) => {

        // Utiliser le module MongoosePost pour ajouter une entrée dans le BDD
        MongooseTask.remove({ _id: req.params.id },
        
        // Fonction de CB
        (err, data) => {
            // Error
            if(err) return res.json( err );

            // Success
            res.json(data)
        });
    });
//

/*
Exporter le module de route
*/
    module.exports = router;
//
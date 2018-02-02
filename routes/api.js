
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

    // Middleware
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
// 



/*
Définition des routes
*/
    // Ajouter une tâche
    router.post('/add-task', (req, res) => {

        mongoose.connect(process.env.MONGO_HOST, (err, db) => {
            // Tester la connection
            if(err) { res.send(err) } 
            else{
                // Afficher les documents de la colletion myRecipe
                db.collection('tasks').insert( {content: req.body.content, state: false}, (err, data) => {
                    if(err) { return res.redirect(500, '/') }
                    else{
                        return res.redirect(301, '/')
                    };
                });
            };
            // Fermer la connexion
            db.close();
        });
    });

    // Supprimer une tâche : A DEBUGER
    router.post('/delete-task/:id', (req, res) => {

        mongoose.connect(process.env.MONGO_HOST, (err, db) => {
            // Tester la connection
            if(err) { res.send(err) } 
            else{
                // Ajouter un document dans la colletion ingredients
                db.collection('tasks').remove({ _id: new ObjectId(req.params.id) }, (err, data) => {
                    if(err) { return res.redirect(500, '/') }
                    else{ res.redirect(301, '/') }
                });
            };
            // Fermer la connexion
            db.close();
        })
    });
//

/*
Exporter le module de route
*/
    module.exports = router;
//
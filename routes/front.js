/*
Importer les composants de la route
*/
    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');
//

/*
Définition des routes
*/
    router.get( '/', (req, res) => {
        mongoose.connect(process.env.MONGO_HOST, (err, db) => {
            console.log('front')
            // Tester la connection
            if(err) { res.send(err) } 
            else{
                // Afficher les documents de la colletion myRecipe
                db.collection('tasks').find().toArray((err, collection) => {
                    // Tester la commande MongoDb
                    if(err){ res.render('index', {content : err}) }
                    else{ 
                        // Envoyer les données au format json
                        res.render('index', {content : collection})
                    }
                })
            }

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
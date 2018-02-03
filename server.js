/*
Importer les composants
*/  
    // Modules
    const express = require('express');
    const path = require('path');
    const ejs = require('ejs');
    const mongoose = require('mongoose'); 

    // Routes
    const frontRoute = require('./routes/front');
    const apiRoute = require('./routes/api');
//

/*
Initialiser le serveur
*/
    // Configuration des variables d'environnement
    require('dotenv').config();

    // Connexion à la BDD avec Mongoose
    mongoose.connect(process.env.MONGO_HOST);
    
    // Définition du serveur
    const app = express();
    const port = process.env.PORT;

    // Définition du dossier statique des vues
    app.set( 'views', __dirname + '/www' );
    app.use( express.static(path.join(__dirname, 'www')) );

    // Définition du moteur de rendu
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    // Définition des routes
    app.use('/', frontRoute);
    app.use('/api', apiRoute);
//

/*
Lancer le serveur
*/ 
    app.listen( port, () => console.log(`Le serveur est lancé sur le port ${port}`) );
//
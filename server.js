/*
Importer les composants
*/  
    // Modules
    const express = require('express');
    const path = require('path');
    const ejs = require('ejs');

    // Routes
    const frontRoute = require('./routes/front');
    const apiRoute = require('./routes/api');
//

/*
Initialiser le serveur
*/
    // Définition du serveur
    const app = express();
    const port = process.env.PORT || 3000;

    // Définition du dossier statique des vues
    app.set( 'views', __dirname + '/www' );
    app.use( express.static(path.join(__dirname, 'www')) );

    // Définition du moteur de rendu
    app.set( 'view engine', 'ejs' );

    // Définition des routes
    app.use('/', frontRoute);
    app.use('/api', apiRoute);
//

/*
Lancer le serveur
*/ 
    app.listen( port, () => console.log(`Le serveur est lancé sur le port ${port}`) );
//
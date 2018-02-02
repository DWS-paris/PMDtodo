/*
Importer les composants de la route
*/
    const express = require('express');
    const router = express.Router();
//

/*
Définition des routes
*/
    router.get( '/', (req, res) => {
        // Renvoyer le fichier index dans la réponse
        res.render('index');
    });
//

/*
Exporter le module de route
*/
    module.exports = router;
//
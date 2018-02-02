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
        // Renvoyer un flux JSON dans la réponse
        res.json({ msg: `Hello API` });
    });
//

/*
Exporter le module de route
*/
    module.exports = router;
//
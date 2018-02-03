document.addEventListener('DOMContentLoaded', function()  {

    /*
    Gestion des requêtes serveur
    */
        var AsyncBot = {
            /*
            Définition des propriétés de l'objet
            */
                asyncObject: null,
                asyncType: null,
                apiUrl: null,
            //

            /*
            Ajout des méthodes (fonctions) de l'objet
            */
                // Réinitialiser l'objet
                resetObject: function(){
                    this.asyncObject = null;
                    this.asyncType = null;
                    this.apiUrl = null;
                },

                // Définition de l'objet ASYNC
                defineAyncObject: function(object)  {
                    // Vérification du type de requête
                    if( this.asyncType === null ) { console.error('Vous devez définir un type de reqête') }
                    else if( this.asyncType === 'GET' ) { this.asyncObject = { method: 'GET' } }

                    // Configuration de l'objet
                    else{
                        this.asyncObject = {
                            method: this.asyncType,
                            body: JSON.stringify(object),
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        };
                    }
                },

                // Définition des URLs de l'API et du type de requête
                defineApiUrl: function(type)  {
                    switch(type){
                        case 'POST':
                            this.apiUrl = 'http://localhost:3000/api/add-task';
                            this.asyncType = 'POST';
                            break;
        
                        case 'PUT':
                            this.apiUrl = 'http://localhost:3000/api/add-task';
                            this.asyncType = 'PUT';
                            break;
        
                        case 'DELETE':
                            this.apiUrl = 'http://localhost:3000/api/delete-task';
                            this.asyncType = 'DELETE';
                            break;
        
                        case 'GET':
                            this.apiUrl = 'http://localhost:3000/api/tasks';
                            this.asyncType = 'GET';
                            break;

                        default:
                            this.apiUrl = null;
                            this.asyncType = null;
                            break;
                    };
                },

                // Charger la liste des tâches
                loadTaskList: function()  {
                    // La fonction fetch() prend en paramètre l'adresse de l'API
                    fetch('http://localhost:3000/api/tasks').then(function (data) {
                            
                        // Les données sont présentes => renvoyer une Promise de type 'resolve'
                        if (data.ok) { return Promise.resolve(data) }

                        // Les données sont présentes => renvoyer une Promise de type 'reject'
                        else { return Promise.reject(new Error('Problème dans la requête')) }
                    })

                    // Traiter le réponse
                    .then(function (data) { return data.json() })

                    // Manipuler les données de la réponse
                    .then(function (data) {
                        // Ajouter les tâches dans le DOM
                        for( var i = 0; i < data.length; i++ ){
                            AsyncBot.appendTask(data[i]);
                        };
                     })

                    // Capter l'erreur
                    .catch(function (err) { return console.error(err) })
                },

                // Ajouter une tâche
                addTask: function(object)  {
                    fetch('http://localhost:3000/api/add-task', {
                        method: 'POST',
                        body: JSON.stringify(object), 
                        headers: new Headers({ 'Content-Type': 'application/json' })
                    })
                    .then(res => res.json())

                    .catch(error => console.error('Error:', error))

                    .then(response => {
                        // Ajouter la tâche dans le DOM
                        AsyncBot.appendTask({content: response.content, state:false, _id: response._id})

                        // Vider le formulaire
                        document.querySelector('#newTodoContent').value = '';
                    });
                },

                // Supprimer une tâche
                deleteTask: function(_id){
                    fetch('http://localhost:3000/api/delete-task/' + _id, {
                        method: 'DELETE',
                        headers: new Headers({ 'Content-Type': 'application/json' })
                    })
                    .then(res => res.json())

                    .catch(error => console.error('Error:', error))

                    .then(response => {
                        console.log(response)
                    });
                },

                // Ajouter une tâche dans le DOM
                appendTask: function(task){
                    // Création de la balise HTML
                    var taskArticle = document.createElement("article");
                    taskArticle.innerHTML = '<p>'+ task.content +'</p><ul data-id-object="'+ task._id +'"><li><button class="confirmTask"><i class="fa fa-check"></i></button></li><li><button data-id-object="'+ task._id +'" class="deleteTask"><i class="fa fa-times"></i></button></li></ul>';

                    // Ajout de la balise HTML dans le DOM
                    document.querySelector('#taskList').appendChild( taskArticle );

                    this.taskEventListener(task._id)
                },

                // Ajout des écouteurs d'événement sur les tâches
                taskEventListener: function(_id){
                    document.querySelector('[data-id-object="'+ _id +'"] .confirmTask').addEventListener('click', function(){
                        console.log('Confirm', _id);
                    });

                    document.querySelector('[data-id-object="'+ _id +'"] .deleteTask').addEventListener('click', function(){
                        console.log('Delete', _id);
                        AsyncBot.deleteTask(_id)
                    });
                },

                // Gestion du formulaire
                getFormSubmit: function(){
                    // Récupération du champs
                    var newTodoContent = document.querySelector('#newTodoContent');

                    // Soumission du formulaire
                    document.querySelector('#addTask form').addEventListener('submit', function(evt){
                        // Bloquer l'événement
                        evt.preventDefault();

                        // Vérifier le champs
                        if( newTodoContent.value.length >=1 ){
                            // Ajouter une tâche
                            AsyncBot.defineApiUrl('POST');
                            AsyncBot.defineAyncObject({ content: newTodoContent.value, state: false });
                            AsyncBot.addTask({ content: newTodoContent.value, state: false })
                        };
                    });
                }
            //
        };
    //


    /*
    Lancer la ToDo
    */
        // Charger la liste des tâches
        AsyncBot.loadTaskList();

        // Capter la soumission du formulaire
        AsyncBot.getFormSubmit();
    //
});
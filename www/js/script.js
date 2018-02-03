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
                        document.getElementById(_id).classList.add('taskDeleted')
                    });
                },

                // Editer l'état d'une tâche
                setTaskState: function(_id, state){
                    fetch('http://localhost:3000/api/set-task-state/' + _id, {
                        method: 'PUT',
                        body: JSON.stringify({state: state.stateVal}), 
                        headers: new Headers({ 'Content-Type': 'application/json' })
                    })
                    .then(res => res.json())

                    .catch(error => console.error('Error:', error))

                    .then(response => {
                        document.getElementById(_id).classList.toggle('taskDone');
                        document.getElementById(_id).setAttribute('data-task-state', response.state)
                    });
                },

                // Ajouter une tâche dans le DOM
                appendTask: function(task){
                    // Création de la balise HTML
                    var taskArticle = document.createElement("article");
                    taskArticle.id = task._id;
                    taskArticle.setAttribute('data-task-state', task.state)
                    if(task.state == true){ taskArticle.classList.add('taskDone') }
                    taskArticle.innerHTML = '<p>'+ task.content +'</p><ul data-id-object="'+ task._id +'"><li><button class="confirmTask"><i class="fa fa-check"></i></button></li><li><button data-id-object="'+ task._id +'" class="deleteTask"><i class="fa fa-times"></i></button></li></ul>';

                    // Ajout de la balise HTML dans le DOM
                    document.querySelector('#taskList').appendChild( taskArticle );

                    // Ajout de les écouteurs d'événement
                    this.taskEventListener(task._id)
                },

                // Ajout des écouteurs d'événement sur les tâches
                taskEventListener: function(_id){
                    // Capter le clic sur le bouton confirmTask
                    document.querySelector('[data-id-object="'+ _id +'"] .confirmTask').addEventListener('click', function(){
                        var activState = document.getElementById(_id).getAttribute('data-task-state');
                        if(activState === 'true') { AsyncBot.setTaskState(_id, { stateVal: false }) }
                        else{ AsyncBot.setTaskState(_id, { stateVal: true }) }
                    });

                    // Capter le clic sur le bouton deleteTask
                    document.querySelector('[data-id-object="'+ _id +'"] .deleteTask').addEventListener('click', function(){
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
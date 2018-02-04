document.addEventListener('DOMContentLoaded', function()  {

    /*
    Gestion des requêtes serveur
    */
        var TodoBot = {
            /*
            Définition des propriétés de l'objet
            */
                asyncObject: null,
                asyncType: null,
                apiUrl: null,
                tasksDone: 0,
                taskToDo: 0,
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
                    // Réinitaliser les données
                    TodoBot.tasksDone = 0;
                    TodoBot.taskToDo = 0;

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
                            TodoBot.appendTask(data[i]);
                        };
                     })

                    // Capter l'erreur
                    .catch(function (err) { return console.error(err) })
                },

                // Charger la liste filtrée des tâches
                loadFiltretedTasks: function(filter){
                    // Réinitaliser les données
                    TodoBot.tasksDone = 0;
                    TodoBot.taskToDo = 0;

                    // La fonction fetch() prend en paramètre l'adresse de l'API
                    fetch('http://localhost:3000/api/tasks/' + filter).then(function (data) {
                            
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
                            TodoBot.appendTask(data[i]);
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
                        TodoBot.appendTask({content: response.content, state:false, _id: response._id})

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
                        document.getElementById(_id).classList.add('taskDeleted');

                        // Mettre à jour le footer la la liste des tâches
                        var taskState = document.querySelector('[data-id-object="'+ _id +'"] .deleteTask').getAttribute('data-state-object');
                        if(taskState === 'true') { TodoBot.tasksDone -= 1 }
                        else { TodoBot.taskToDo -= 1 };
                        TodoBot.setTaskData();
                        
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
                        document.getElementById(_id).setAttribute('data-task-state', response.state);
                        document.querySelector('[data-id-object="'+ _id +'"] .deleteTask').setAttribute('data-state-object', response.state);
                        
                        // Mettre à jour le footer la la liste des tâches
                        if( response.state === false ){ TodoBot.taskToDo += 1, TodoBot.tasksDone -= 1 }
                        else{ TodoBot.tasksDone += 1, TodoBot.taskToDo -= 1 }
                        TodoBot.setTaskData();
                    });
                },

                // Ajouter une tâche dans le DOM
                appendTask: function(task){
                    // Création de la balise HTML
                    var taskArticle = document.createElement("article");

                    // Ajouter une ID à l'article
                    taskArticle.id = task._id;

                    // Ajouter un attribut à l'article
                    taskArticle.setAttribute('data-task-state', task.state)

                    // Définir si la tpache est faite ou non
                    if(task.state == true){ 
                        taskArticle.classList.add('taskDone');
                        TodoBot.tasksDone += 1;

                    } else { TodoBot.taskToDo += 1 };
                    
                    // Ajouter du contenu HTML à l'article
                    taskArticle.innerHTML = '<p>'+ task.content +'</p><ul data-id-object="'+ task._id +'"><li><button class="confirmTask"><i class="fa fa-check"></i></button></li><li><button data-id-object="'+ task._id +'" data-state-object="'+ task.state +'" class="deleteTask"><i class="fa fa-times"></i></button></li></ul>';

                    // Ajout de la balise HTML dans le DOM
                    document.querySelector('#taskList').appendChild( taskArticle );

                    // Ajout de les écouteurs d'événement
                    this.taskEventListener(task._id);

                    // Mettre à jour le footer la la liste des tâches
                    TodoBot.setTaskData();
                },

                // Vider la liste des tâches
                removeTasks: function(){
                    var taskList = document.getElementById('taskList');

                    taskList.classList.add('close');

                    window.setTimeout(function(){
                        taskList.innerHTML = '';
                        taskList.classList.remove('close');
                    }, 500)
                },

                // Editer le footer de la liste des tâches
                setTaskData: function(task){

                    // Récupération des balises HTML
                    var taskTodo = document.getElementById('taskTodo');
                    var taskDone = document.getElementById('taskDone');

                    // Calcule des tâches faites
                    if( TodoBot.taskToDo >= 2 ){ taskTodo.innerHTML = '<b>' + TodoBot.taskToDo + '</b> tâches à faire' }
                    else if( TodoBot.taskToDo === 1 ){ taskTodo.innerHTML = '<b>1</b> tâche à faire' }
                    else{ taskTodo.innerHTML = '' }

                    // Calcule des tâches à faire
                    if( TodoBot.tasksDone >= 2 ){ taskDone.innerHTML = ' <b>' + TodoBot.tasksDone + '</b> tâches faites' }
                    else if( TodoBot.tasksDone === 1 ){ taskDone.innerHTML = ' <b>' + TodoBot.tasksDone + '</b> tâche faite' }
                    else{ taskDone.innerHTML = '' }
                },

                // Ajout des écouteurs d'événement sur les tâches
                taskEventListener: function(_id){TodoBot
                    // Afficher la tâche
                    window.setTimeout(function(){
                        document.getElementById(_id).classList.add('open');
                    }, 200);
                    

                    // Capter le clic sur le bouton confirmTask
                    document.querySelector('[data-id-object="'+ _id +'"] .confirmTask').addEventListener('click', function(){
                        var activState = document.getElementById(_id).getAttribute('data-task-state');
                        if(activState === 'true') { TodoBot.setTaskState(_id, { stateVal: false }) }
                        else{ TodoBot.setTaskState(_id, { stateVal: true }) }
                    });

                    // Capter le clic sur le bouton deleteTask
                    document.querySelector('[data-id-object="'+ _id +'"] .deleteTask').addEventListener('click', function(){
                        TodoBot.deleteTask(_id)
                    });
                },

                // Gestion du formulaire
                getFormSubmit: function(){TodoBot
                    // Récupération du champs
                    var newTodoContent = document.querySelector('#newTodoContent');

                    // Soumission du formulaire
                    document.querySelector('#addTask form').addEventListener('submit', function(evt){
                        // Bloquer l'événement
                        evt.preventDefault();

                        // Vérifier le champs
                        if( newTodoContent.value.length >=1 ){
                            // Ajouter une tâche
                            TodoBot.addTask({ content: newTodoContent.value, state: false })
                        };
                    });
                },

                // Gestion des boutons dans le footer de la liste des tâches
                getFilterBtnClick: function(){
                    var btnAllTasks = document.getElementById('btnAllTasks');
                    var btnToDoTacks = document.getElementById('btnToDoTacks');
                    var btnDoneTasks = document.getElementById('btnDoneTasks');
                    
                    btnToDoTacks.addEventListener('click', function(){
                        // Lancer le filtre
                        TodoBot.removeTasks();
                        window.setTimeout(function(){
                            TodoBot.loadFiltretedTasks('toDo');
                        }, 600)

                        // Gestion des class
                        this.classList.add('active');
                        btnAllTasks.classList.remove('active');
                        btnDoneTasks.classList.remove('active');
                    });

                    btnDoneTasks.addEventListener('click', function(){
                        // Lancer le filtre
                        TodoBot.removeTasks();
                        window.setTimeout(function(){
                            TodoBot.loadFiltretedTasks('isDone');
                        }, 600)

                        // Gestion des class
                        this.classList.add('active');
                        btnAllTasks.classList.remove('active');
                        btnToDoTacks.classList.remove('active');
                    });

                    btnAllTasks.addEventListener('click', function(){
                        // Lancer le filtre
                        TodoBot.removeTasks();
                        window.setTimeout(function(){
                            TodoBot.loadTaskList();
                        }, 600)

                        // Gestion des class
                        this.classList.add('active');
                        btnToDoTacks.classList.remove('active');
                        btnDoneTasks.classList.remove('active');
                    });
                }
            //
        };
    //


    /*
    Lancer la ToDo
    */
        // Charger la liste des tâches
        TodoBot.loadTaskList();

        // Capter la soumission du formulaire
        TodoBot.getFormSubmit();

        // Capter le click sur les boutons du footer de la liste des tâches
        TodoBot.getFilterBtnClick();
    //
});
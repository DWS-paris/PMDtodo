/*
Chargement du DOM
*/
    document.addEventListener('DOMContentLoaded', function()  {

        /*
        Gestion des requêtes serveur
        */
            var TodoBot = {
                /*
                Définition des propriétés de l'objet
                */  
                    tasksDone: 0,
                    taskToDo: 0,

                    taskData: {
                        tasksDone: 0,
                        taskToDo: 0,
                        reset: function(){
                            this.tasksDone = 0;
                            this.taskToDo = 0;
                        }
                    },

                    apiUrl: {
                        tasks: 'http://localhost:3000/api/tasks/',
                        add: 'http://localhost:3000/api/add-task',
                        delete: 'http://localhost:3000/api/delete-task/',
                        set: 'http://localhost:3000/api/set-task-state/'
                    },

                    domElements: {
                        form: {
                            theForm: document.querySelector('#addTask form'),
                            newTodoContent: document.querySelector('#newTodoContent')
                        },
                        filter: {
                            btnAllTasks: document.getElementById('btnAllTasks'),
                            btnToDoTacks: document.getElementById('btnToDoTacks'),
                            btnDoneTasks: document.getElementById('btnDoneTasks')
                        },
                        taskData: {
                            taskTodo: document.getElementById('taskTodo'),
                            taskDone: document.getElementById('taskDone')
                        },
                        taskList: {
                            theList: document.getElementById('taskList')
                        },
                        errors: {
                            errorMsg: document.getElementById('errorMsg'),
                            errorHandeler: document.getElementById('errorHandeler')
                        }
                    },
                //

                /*
                Ajout des méthodes (fonctions) de l'objet
                */
                    // Charger la liste des tâches
                    loadTaskList: function()  {
                        // Réinitaliser les données
                        TodoBot.taskData.reset();

                        // La fonction fetch() prend en paramètre l'adresse de l'API
                        fetch(TodoBot.apiUrl.tasks).then(function (data) {
                                
                            // Les données sont présentes => renvoyer une Promise de type 'resolve'
                            if (data.ok) { return Promise.resolve(data) }

                            // Les données sont présentes => renvoyer une Promise de type 'reject'
                            else { return Promise.reject(new Error('Problème de requête, veuillez actualiser la page et vérifier votre connexion.')) }
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
                        .catch(function (err) { TodoBot.errorHandeler({error: 404, msg: err}) })
                    },

                    // Charger la liste filtrée des tâches
                    loadFiltretedTasks: function(filter){
                        // Réinitaliser les données
                        TodoBot.taskData.reset();

                        // La fonction fetch() prend en paramètre l'adresse de l'API
                        fetch(TodoBot.apiUrl.tasks + filter).then(function (data) {
                                
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
                        .catch(function (err) { TodoBot.errorHandeler({error: 404, msg: err}) })
                    },

                    // Ajouter une tâche
                    addTask: function(object)  {
                        fetch(TodoBot.apiUrl.add, {
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
                            TodoBot.domElements.form.newTodoContent.value = '';
                        });
                    },

                    // Supprimer une tâche
                    deleteTask: function(_id){
                        fetch(TodoBot.apiUrl.delete + _id, {
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
                        fetch(TodoBot.apiUrl.set + _id, {
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
                        TodoBot.domElements.taskList.theList.appendChild( taskArticle );

                        // Ajout de les écouteurs d'événement
                        this.taskEventListener(task._id);

                        // Mettre à jour le footer la la liste des tâches
                        TodoBot.setTaskData();
                    },

                    // Vider la liste des tâches
                    removeTasks: function(){
                        TodoBot.domElements.taskList.theList.classList.add('close');
                        window.setTimeout(function(){
                            TodoBot.domElements.taskList.theList.innerHTML = '';
                            TodoBot.domElements.taskList.theList.classList.remove('close');
                        }, 500)
                    },

                    // Editer le footer de la liste des tâches
                    setTaskData: function(task){
                        // Calcule des tâches faites
                        if( TodoBot.taskToDo >= 2 ){ TodoBot.domElements.taskData.taskTodo.innerHTML = '<b>' + TodoBot.taskToDo + '</b> tâches à faire' }
                        else if( TodoBot.taskToDo === 1 ){ TodoBot.domElements.taskData.taskTodo.innerHTML = '<b>1</b> tâche à faire' }
                        else{ TodoBot.domElements.taskData.taskTodo.innerHTML = '' }

                        // Calcule des tâches à faire
                        if( TodoBot.tasksDone >= 2 ){ TodoBot.domElements.taskData.taskDone.innerHTML = ' <b>' + TodoBot.tasksDone + '</b> tâches faites' }
                        else if( TodoBot.tasksDone === 1 ){ TodoBot.domElements.taskData.taskDone.innerHTML = ' <b>' + TodoBot.tasksDone + '</b> tâche faite' }
                        else{ TodoBot.domElements.taskData.taskDone.innerHTML = '' }
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
                        // Soumission du formulaire
                        TodoBot.domElements.form.theForm.addEventListener('submit', function(evt){
                            // Bloquer l'événement
                            evt.preventDefault();

                            // Vérifier le champs
                            if( TodoBot.domElements.form.newTodoContent.value.length >=1 ){
                                // Ajouter une tâche
                                TodoBot.addTask({ content: TodoBot.domElements.form.newTodoContent.value, state: false })
                            };
                        });
                    },

                    // Gestion des boutons dans le footer de la liste des tâches
                    getFilterBtnClick: function(){                        
                        TodoBot.domElements.filter.btnToDoTacks.addEventListener('click', function(){
                            // Lancer le filtre
                            TodoBot.removeTasks();
                            window.setTimeout(function(){
                                TodoBot.loadFiltretedTasks('toDo');
                            }, 600)

                            // Gestion des class
                            this.classList.add('active');
                            TodoBot.domElements.filter.btnAllTasks.classList.remove('active');
                            TodoBot.domElements.filter.btnDoneTasks.classList.remove('active');
                        });

                        TodoBot.domElements.filter.btnDoneTasks.addEventListener('click', function(){
                            // Lancer le filtre
                            TodoBot.removeTasks();
                            window.setTimeout(function(){
                                TodoBot.loadFiltretedTasks('isDone');
                            }, 600)

                            // Gestion des class
                            this.classList.add('active');
                            TodoBot.domElements.filter.btnAllTasks.classList.remove('active');
                            TodoBot.domElements.filter.btnToDoTacks.classList.remove('active');
                        });

                        TodoBot.domElements.filter.btnAllTasks.addEventListener('click', function(){
                            // Lancer le filtre
                            TodoBot.removeTasks();
                            window.setTimeout(function(){
                                TodoBot.loadTaskList();
                            }, 600)

                            // Gestion des class
                            this.classList.add('active');
                            TodoBot.domElements.filter.btnToDoTacks.classList.remove('active');
                            TodoBot.domElements.filter.btnDoneTasks.classList.remove('active');
                        });
                    },

                    // Gestion des erreurs
                    errorHandeler: function(error){
                        TodoBot.domElements.errors.errorMsg.innerHTML = '<i class="fa fa-exclamation-circle"></i> <span>'+ error.msg +'</span>'
                        TodoBot.domElements.errors.errorHandeler.classList.add('open')
                    },

                    // Initialisation
                    init: function(){
                        // Charger la liste des tâches
                        TodoBot.loadTaskList();
                        // Capter la soumission du formulaire
                        TodoBot.getFormSubmit();
                        // Capter le click sur les boutons du footer de la liste des tâches
                        TodoBot.getFilterBtnClick();
                    }
                //
            };
        //


        /*
        Lancer la ToDo
        */
            TodoBot.init();
        //
    });
// 
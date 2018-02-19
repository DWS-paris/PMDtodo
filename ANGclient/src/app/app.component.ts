/*
Importer les class du composant
*/
  import { Component, OnInit } from '@angular/core';

  // Importer le service
  import { TasksService } from './services/tasks.service';

  // Importer l'interface objet
  import { TaskModel } from './models/task.model';
//

/*
Définir le composant
*/
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',

    // Renseigner le service dans le tableau de providers
    providers: [ TasksService ]
  })
//

/*
Exporter le composant
*/
  export class AppComponent implements OnInit {

    // Créer une variable pour la collection de tâches
    public tasksCollection: Array<TaskModel>;
    public tempTask: any;

    // Créer un objet pour gérer le formulaire
    public taskFormObject: TaskModel = {
      error: 2,
      title: ``,
      content: ``,
      type: `NULL`,
      isDone: false
    };

    // Injecter le service dans le constructeur
    constructor(
      private myService: TasksService
    ){};

    // Créer une fonction pour charger les tâches depuis le service
    private getAllTasks = (): void => {
      this.myService.getTasks()
      .then( data => this.tasksCollection = data )
      .catch( err => console.error(err) )
    };

    // Créer une fonction pour ajouter une tâche dans la BDD
    public addNewTask = (evt: TaskModel): void => {
      console.log(evt)

      // Définition de la tâche à ajouter
      this.tempTask = {
        title: evt.title,
        content: evt.content,
        type: evt.type,
        isDone: false
      };

      // Appeler la fonction du service pour ajouter une tâche
      this.myService.addTask(this.tempTask)
      .then( uniqTask => {
        // Ajouter l'objet dans la collection
        this.tasksCollection.push( uniqTask )
        // Vider le formulaire
        this.taskFormObject = {
          error: 3,
          title: ``,
          content: ``,
          type: `NULL`,
          isDone: false
        }
      } )
      .catch( err => console.error(err) )
    };


    // Fonction pour éditer une tâche
    public setTask = ( evt: TaskModel ) => {
      console.log(evt)
      // Inverser la valeur isDone
      evt.isDone = !evt.isDone;

      // Appeler la fonction du service
      this.myService.setTask( evt )
      .then( uniqTask => console.log(uniqTask) )
      .catch( err => console.error(err) )
    }

    // Fonction pour supprimer une tâche
    public deleteTask = ( evt: number ) => {
      // Appeler la fonction du service
      this.myService.deleteTask( evt )
      .then( data => {
        this.getAllTasks();
      })
      .catch( err => console.log(err) )
    };

    // Fonction pour attendre le chargement du composant
    ngOnInit() {
      // Charger la liste de tâches
      this.getAllTasks();
    };
  };
//

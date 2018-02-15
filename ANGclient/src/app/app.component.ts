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

    

    // Injecter le service dans le constructeur
    constructor(
      private myService: TasksService
    ){};

    // Créer une variable
    public appTitle: string = `My ToDo MVC`;

    // Créer une collection de données
    public dataCollection: Array<string|boolean|number> = [
      `Tester le data binding`,
      `Tester les itérations Angular`,
      `Boire un café`,
      true,
      1234567
    ];


    // Créer une fonction pour charger les tâches depuis le service
    private getAllTasks = (): void => {
      this.myService.getTasks()
      .then( data => console.log(data) )
      .catch( err => console.error(err) )
    };

    // Fonction pour attendre le chargement du composant
    ngOnInit() {
      // Charger la liste de tâches
      this.getAllTasks();
    };
  };
//

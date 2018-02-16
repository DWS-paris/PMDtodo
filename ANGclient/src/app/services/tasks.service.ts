/*
Importer les class
*/
  import { Injectable } from '@angular/core';

  // Importer les class Http et Response pour faire des requêtes
  import { Http, Response } from '@angular/http';

  // Importer le sytème de gestion de Promise
  import 'rxjs/add/operator/toPromise';

  // Importer l'interface objet
  import { TaskModel } from '../models/task.model';
//

/*
Exporter le service
*/
  @Injectable()
  export class TasksService {

    // Créer une variable pour l'adresse de l'API
    private apiUrl: string = `http://localhost:3000/tasks`;

    // Injecter la class Http dans le service
    constructor( private http: Http ) {};


    /* 
    Créer une fonction pour afficher la liste des tâches
    */
      public getTasks = (): Promise<TaskModel[]> => {
        return this.http.get(this.apiUrl).toPromise()
        // Success
        .then( data => this.dataFromApi(data) )
        // Error
        .catch( err => this.handleError(err) )
      };
    //

    /*
    Créer une fonction pour ajouter une tâche
    */
      public addTask = ( newTask: TaskModel ): Promise<TaskModel> => {
        return this.http.post(this.apiUrl, newTask).toPromise()
        // Success
        .then( data => this.dataFromApi(data) )
        // Error
        .catch( err => this.handleError(err) );
      };
    //

    /*
    Créer une fonction pour supprimer une tâche
    */
      public deleteTask = ( id: number ): Promise<TaskModel> => {
        return this.http.delete( `${this.apiUrl}/${id}` ).toPromise()
        // Success
        .then( data => this.dataFromApi(data) )
        // Error
        .catch( err => this.handleError(err) );
      };
    //

    /*
    Créer une fonction pour inverser la valuer isDone d'une tâche
    */
      public setTask = ( task: TaskModel ): Promise<TaskModel> => {
        return this.http.put( `${this.apiUrl}/${task.id}`, task ).toPromise()
        // Success
        .then( data => this.dataFromApi(data) )
        // Error
        .catch( err => this.handleError(err) );
      }
    //

    /*
    Fonctions de traitement des Promises
    */
      // Traitement des réponses JSON
      private dataFromApi(res: Response) {
        return res.json() || { };
      };

      // Traitement des erreurs
      private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        return Promise.reject(errMsg);
      };
    //

  }
//

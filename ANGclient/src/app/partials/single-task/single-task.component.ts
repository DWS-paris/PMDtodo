import { Component, Output, EventEmitter } from '@angular/core';

// Importer la class Input pour récupérer la valeur d'une variable du composant parent
import { Input } from '@angular/core';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-single-task',
  styles: [ `.taskDone{ opacity: .5 }` ],
  template: `
    <article>
      <div [ngClass]="{ taskDone: singleItem.isDone }" >
        <h2>{{singleItem.title}}</h2>
        <p>{{singleItem.content}} <b>{{singleItem.type}}</b></p>
      </div>
      <button (click)="emitSetTask(singleItem)">Valider</button>
      <button (click)="emitDeleteTask(singleItem._id)">Supprimer</button>
    </article>
  `
})
export class SingleTaskComponent {

  // Utilisation du décorateur Input pour charger la valeur d'un variable
  @Input() singleItem;

  // Définir les événements
  @Output() setTask = new EventEmitter;
  @Output() deleteTask = new EventEmitter;

  // Définir les fonction pour émettre les événements
  public emitSetTask = ( item: TaskModel ) => {
    this.setTask.emit(item)
  };

  public emitDeleteTask = ( id: number ) => {
    this.deleteTask.emit(id);
  };
}

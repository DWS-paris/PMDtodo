import { Component, Output, EventEmitter } from '@angular/core';

// Importer la class Input pour récupérer la valeur d'une variable du composant parent
import { Input } from '@angular/core';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-single-task',
  styles: [ `.taskDone{ opacity: .5 }` ],
  template: `
    <article class="singleTask">
      <div [ngClass]="{ taskDone: singleItem.isDone }" >
        <h3>{{singleItem.title}} <b>{{singleItem.type}}</b></h3>
        <p>{{singleItem.content}}</p>
      </div>
      <aside>
        <button (click)="emitSetTask(singleItem)"><span *ngIf="singleItem.isDone"><i class="fas fa-undo-alt"></i></span><span *ngIf="!singleItem.isDone"><i class="fas fa-check"></i></span></button>
        <button (click)="emitDeleteTask(singleItem._id)"><i class="fas fa-trash-alt"></i></button>
      </aside>
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

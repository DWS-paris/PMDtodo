import { Component, OnInit } from '@angular/core';

// Importer la class Input pour récupérer la valeur d'une variable du composant parent
import { Input } from '@angular/core';

@Component({
  selector: 'app-single-task',
  template: `
    <h2>{{singleItem.title}}</h2>
    <p>{{singleItem.content}} <b>{{singleItem.type}}</b></p>
  `
})
export class SingleTaskComponent implements OnInit {

  // Utilisation du décorateur Input pour charger la valeur d'un variable
  @Input() singleItem;

  constructor() { }

  ngOnInit() {
  }

}

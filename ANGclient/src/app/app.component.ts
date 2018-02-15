/*
Importer les class du composant
*/
  import { Component } from '@angular/core';
//

/*
Définir le composant
*/
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
//

/*
Exporter le composant
*/
  export class AppComponent {
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
  }
//

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importer la class pour utiliser le ngModel
import { FormsModule } from '@angular/forms';

// Importer la class pour utiliser les requêtes serveur
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { TodoFormComponent } from './partials/todo-form/todo-form.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent
  ],
  // Renseigner les modules dans le tableau des imports
  imports: [
    BrowserModule, FormsModule, HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

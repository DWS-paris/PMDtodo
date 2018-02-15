import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importer la class pour tuiliser le ngModel
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TodoFormComponent } from './partials/todo-form/todo-form.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent
  ],
  // Renseigner les modules dans le tableau des imports
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

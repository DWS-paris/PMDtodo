import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styles: []
})
export class TodoFormComponent implements OnInit {

  // Créer un objet pour gérer le formulaire
  public formObject = {
    error: 3,
    todoTitle: ``,
    todoContent: ``,
    todoType: `NULL`
  };

  // Créer un objet pour les messages d'erreur
  public errorMsg = {
    title: {
      msg: `Minimum 5 caractère pour le titre`,
      active: false
    },
    content: {
      msg: `Minimum 5 caractère pour le contenu`,
      active: false
    },
    type: {
      msg: `Vous devez sélectionner un type`,
      active: false
    }
  }

  // Créer une fonction pour la soumission du formulaire
  public submitForm = () => {

    // Réinitialiser la valeur de error
    this.formObject.error = 3;
    
    // Vérifier la présence de données
    if( this.formObject.todoTitle.length >= 5 ){
      // Supprimer une erreur
      this.formObject.error -= 1;

    } else{
      // Afficher un message d'erreur
      this.errorMsg.title.active = true
    }

    if( this.formObject.todoContent.length >= 5 ){
      // Supprimer une erreur
      this.formObject.error -= 1;

    } else{
      // Afficher un message d'erreur
      this.errorMsg.content.active = true
    }

    if( this.formObject.todoType !== "NULL" ){
      // Supprimer une erreur
      this.formObject.error -= 1;

    } else{
      // Afficher un message d'erreur
      this.errorMsg.type.active = true
    }

    /*
    Validation finale : formObject.error doit être égale à 0
    */
      if( this.formObject.error === 0 ){
        // Le formulaire est validé
        console.log( 'OK' );
      };
    //


  };

  constructor() { }

  // Attendre le chargement du composant
  ngOnInit() {
  };

};

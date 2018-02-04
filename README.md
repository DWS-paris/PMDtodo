# PMDtodo
Projet de cours basé sur le site todomvc.com.

## User stories
Définition des actions de l'utilisateur :
- [x] En tant qu'utilisateur je peux ajouter une tache
- [x] En tant qu'utilisateur je peux valider une tâche
- [x] En tant qu'utilisateur je peux supprimer une tâche
- [x] En tant qu'utilisateur je peux filtrer les tâches réalisés
- [x] En tant qu'utilisateur je peux filtrer les tâches à réaliser
- [x] En tant qu'utilisateur je peux supprimer toutes les tâches réalisées

## Mise en place du projet
Etapes à suivre pour préparer le projet PMDtodo
- [x] Initier un server Nodejs
- [x] Lancer le serveur de base de données
- [x] Créer la BDD MongoDB 
- [x] Créer une route `front` pour afficher une fichier `index` dans un dossier `www`
- [x] Créer une route `api` qui renvoie en `json` l'objet `{ msg: 'Hello API' }`

## Configurer la base de données
Le but est de définir le-s model-s de données à utiliser pour l'application
- 1. Combien d'informations faut-il enregister pour une tâche ?
- 2. Comment une tâche est validée ?
- 3. Comment une tâche est supprimée ?
- 4. Comment les tâches sont filtrées ?


### 1. Combien d'informations faut-il enregister pour une tâche ?
Il faut 3 informations :
- _id: string
- state: boolean
- content: string


### 2. Comment une tâche est validée ?
Quand la propriété `state` est égale à `true`.


### 3. Comment une tâche est supprimée ?
Chaque tâche présente un bouton qui, au clic, permet de supprimer l'objet
- [x] Je dois connaître la propriété `_id` de l'objet
- [x] Créer une route `api` pour supprimer l'objet de la base de données


### 4. Comment les tâches sont filtrées ?
Je dois sélectionner tous les objets et n'afficher que ceux dont la propriété `state` est égale à `true` (ou `false`)
- [x] Créer une route `api` pour sélectionnher les tâches
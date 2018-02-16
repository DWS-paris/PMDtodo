/*
Création d'un model objet = interface
*/
export interface TaskModel {
    // Propriété optionnelle
    id?: number,
    error?: number,
    
    title: string,
    content: string,
    type: string,
    isDone: boolean
};
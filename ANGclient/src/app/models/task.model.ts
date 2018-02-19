/*
Création d'un model objet = interface
*/
export interface TaskModel {
    // Propriété optionnelle
    _id?: number,
    error?: number,
    
    title: string,
    content: string,
    type: string,
    state: boolean
};
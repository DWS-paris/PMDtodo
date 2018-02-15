/*
Création d'un model objet = interface
*/
export interface TaskModel {
    id: number,
    title: string,
    content: string,
    type: string,
    isDone: boolean
};
/*
Importer les class
*/
  import { Injectable } from '@angular/core';
//

/*
Exporter le service
*/
  @Injectable()
  export class TasksService {

    constructor() { }

    public helloService = () => {
      alert('Hello from the Service');
    };

  }
//

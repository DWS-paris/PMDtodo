webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- \n  Intéger un partial/composant \n  Binding d'un événement perso\n-->\n<app-todo-form \n  (sendData)=\"addNewTask($event)\"\n  [formObject]=\"taskFormObject\" \n></app-todo-form>\n\n<!-- \nAvant l'itération, s'assurer que la collection des données est pleine\n-->\n<section id=\"taskList\" *ngIf=\"tasksCollection\">\n  <!-- Itération sur l'article -->\n  <article *ngFor=\"let item of tasksCollection\">\n    <app-single-task \n      (setTask)=\"setTask($event)\"   \n      (deleteTask)=\"deleteTask($event)\"\n      [singleItem]=\"item\" \n    ></app-single-task>\n  </article>\n</section>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Importer les class du composant
*/
var core_1 = __webpack_require__("../../../core/esm5/core.js");
// Importer le service
var tasks_service_1 = __webpack_require__("../../../../../src/app/services/tasks.service.ts");
//
/*
Définir le composant
*/
var AppComponent = /** @class */ (function () {
    // Injecter le service dans le constructeur
    function AppComponent(myService) {
        var _this = this;
        this.myService = myService;
        // Créer un objet pour gérer le formulaire
        this.taskFormObject = {
            error: 2,
            title: "",
            content: "",
            type: "NULL",
            state: false
        };
        // Créer une fonction pour charger les tâches depuis le service
        this.getAllTasks = function () {
            _this.myService.getTasks()
                .then(function (data) { return _this.tasksCollection = data; })
                .catch(function (err) { return console.error(err); });
        };
        // Créer une fonction pour ajouter une tâche dans la BDD
        this.addNewTask = function (evt) {
            console.log(evt);
            // Définition de la tâche à ajouter
            _this.tempTask = {
                title: evt.title,
                content: evt.content,
                type: evt.type,
                isDone: false
            };
            // Appeler la fonction du service pour ajouter une tâche
            _this.myService.addTask(_this.tempTask)
                .then(function (uniqTask) {
                // Ajouter l'objet dans la collection
                _this.tasksCollection.push(uniqTask);
                // Vider le formulaire
                _this.taskFormObject = {
                    error: 3,
                    title: "",
                    content: "",
                    type: "NULL",
                    state: false
                };
            })
                .catch(function (err) { return console.error(err); });
        };
        // Fonction pour éditer une tâche
        this.setTask = function (evt) {
            // Inverser la valeur isDone
            evt.state = !evt.state;
            // Appeler la fonction du service
            _this.myService.setTask(evt)
                .then(function (uniqTask) { return console.log(uniqTask); })
                .catch(function (err) { return console.error(err); });
        };
        // Fonction pour supprimer une tâche
        this.deleteTask = function (evt) {
            // Appeler la fonction du service
            _this.myService.deleteTask(evt)
                .then(function (data) {
                _this.getAllTasks();
            })
                .catch(function (err) { return console.log(err); });
        };
    }
    ;
    // Fonction pour attendre le chargement du composant
    AppComponent.prototype.ngOnInit = function () {
        // Charger la liste de tâches
        this.getAllTasks();
    };
    ;
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            // Renseigner le service dans le tableau de providers
            providers: [tasks_service_1.TasksService]
        })
        //
        /*
        Exporter le composant
        */
        ,
        __metadata("design:paramtypes", [tasks_service_1.TasksService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
;
//


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
// Importer la class pour utiliser le ngModel
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
// Importer la class pour utiliser les requêtes serveur
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var todo_form_component_1 = __webpack_require__("../../../../../src/app/partials/todo-form/todo-form.component.ts");
var single_task_component_1 = __webpack_require__("../../../../../src/app/partials/single-task/single-task.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                todo_form_component_1.TodoFormComponent,
                single_task_component_1.SingleTaskComponent
            ],
            // Renseigner les modules dans le tableau des imports
            imports: [
                platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/partials/single-task/single-task.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
// Importer la class Input pour récupérer la valeur d'une variable du composant parent
var core_2 = __webpack_require__("../../../core/esm5/core.js");
var SingleTaskComponent = /** @class */ (function () {
    function SingleTaskComponent() {
        var _this = this;
        // Définir les événements
        this.setTask = new core_1.EventEmitter;
        this.deleteTask = new core_1.EventEmitter;
        // Définir les fonction pour émettre les événements
        this.emitSetTask = function (item) {
            _this.setTask.emit(item);
        };
        this.emitDeleteTask = function (id) {
            _this.deleteTask.emit(id);
        };
    }
    __decorate([
        core_2.Input(),
        __metadata("design:type", Object)
    ], SingleTaskComponent.prototype, "singleItem", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SingleTaskComponent.prototype, "setTask", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SingleTaskComponent.prototype, "deleteTask", void 0);
    SingleTaskComponent = __decorate([
        core_1.Component({
            selector: 'app-single-task',
            styles: [".taskDone{ opacity: .5 }"],
            template: "\n    <article class=\"singleTask\">\n      <div [ngClass]=\"{ taskDone: singleItem.state }\" >\n        <h3>{{singleItem.title}} <b>{{singleItem.type}}</b></h3>\n        <p>{{singleItem.content}}</p>\n      </div>\n      <aside>\n        <button (click)=\"emitSetTask(singleItem)\"><span *ngIf=\"singleItem.state\"><i class=\"fas fa-undo-alt\"></i></span><span *ngIf=\"!singleItem.state\"><i class=\"fas fa-check\"></i></span></button>\n        <button (click)=\"emitDeleteTask(singleItem._id)\"><i class=\"fas fa-trash-alt\"></i></button>\n      </aside>\n    </article>\n  "
        })
    ], SingleTaskComponent);
    return SingleTaskComponent;
}());
exports.SingleTaskComponent = SingleTaskComponent;


/***/ }),

/***/ "../../../../../src/app/partials/todo-form/todo-form.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- \nBinding d'événement\n-->\n<button id=\"addTask\" (click)=\" addNewTask = !addNewTask \"><span *ngIf=\"!addNewTask\"><i class=\"fas fa-plus-circle\"></i> Ajouter</span><span *ngIf=\"addNewTask\"><i class=\"fas fa-times-circle\"></i> Annuler</span></button>\n<form action=\"test.php\" (submit)=\"submitForm()\" [ngClass]=\"{open: addNewTask}\">\n    <!-- \n    Utilisation du ngModel : data binding aller/retour\n  -->\n  <fieldset>\n    <label for=\"todoTitle\">Titre<b>*</b> <span *ngIf=\"errorMsg.title.active\" >{{ errorMsg.title.msg }}</span> </label>\n    <input type=\"text\" name=\"todoTitle\" \n      [(ngModel)]=\"formObject.title\" \n      (focus)=\"errorMsg.title.active = false\"\n    >\n  </fieldset>\n\n  <fieldset>\n    <label for=\"todoContent\">Description</label>\n    <textarea \n      name=\"todoContent\" \n      [(ngModel)]=\"formObject.content\"\n    ></textarea>\n  </fieldset>\n\n  <fieldset>\n    <label for=\"todoType\">Type<b>*</b> <span *ngIf=\"errorMsg.type.active\" >{{ errorMsg.type.msg }}</span></label>\n    <select name=\"todoType\" \n      [(ngModel)]=\"formObject.type\" \n      (focus)=\"errorMsg.type.active = false\"\n    >\n      <option value=\"NULL\">- Sélectionner -</option>\n      <option value=\"WORK\"><i class=\"fas fa-plus-circle\"></i> Travail</option>\n      <option value=\"FUN\">Loisir</option>\n    </select>\n  </fieldset>\n\n  <button type=\"submit\">Ajouter</button> \n</form>"

/***/ }),

/***/ "../../../../../src/app/partials/todo-form/todo-form.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
/*
Importer les class pour générer un événement à capter dans le composant parent
*/
var core_2 = __webpack_require__("../../../core/esm5/core.js");
var TodoFormComponent = /** @class */ (function () {
    function TodoFormComponent() {
        var _this = this;
        // Création d'un événement
        this.sendData = new core_2.EventEmitter;
        // Création d'une variable pour afficher le formulaire
        this.addNewTask = false;
        // Créer un objet pour les messages d'erreur
        this.errorMsg = {
            title: {
                msg: "Vous devez donner un titre",
                active: false
            },
            type: {
                msg: "Vous devez s\u00E9lectionner un type",
                active: false
            }
        };
        // Créer une fonction pour la soumission du formulaire
        this.submitForm = function () {
            // Réinitialiser la valeur de error
            _this.formObject.error = 2;
            // Vérifier la présence de données
            if (_this.formObject.title.length >= 5) {
                // Supprimer une erreur
                _this.formObject.error -= 1;
            }
            else {
                // Afficher un message d'erreur
                _this.errorMsg.title.active = true;
            }
            if (_this.formObject.type !== "NULL") {
                // Supprimer une erreur
                _this.formObject.error -= 1;
            }
            else {
                // Afficher un message d'erreur
                _this.errorMsg.type.active = true;
            }
            /*
            Validation finale : formObject.error doit être égale à 0
            */
            if (_this.formObject.error === 0) {
                // Le formulaire est validé : émettre l'événement sendData
                _this.sendData.emit(_this.formObject);
            }
            ;
            //
        };
    }
    // Attendre le chargement du composant
    TodoFormComponent.prototype.ngOnInit = function () {
    };
    ;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TodoFormComponent.prototype, "formObject", void 0);
    __decorate([
        core_2.Output(),
        __metadata("design:type", Object)
    ], TodoFormComponent.prototype, "sendData", void 0);
    TodoFormComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-form',
            template: __webpack_require__("../../../../../src/app/partials/todo-form/todo-form.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TodoFormComponent);
    return TodoFormComponent;
}());
exports.TodoFormComponent = TodoFormComponent;
;


/***/ }),

/***/ "../../../../../src/app/services/tasks.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Importer les class
*/
var core_1 = __webpack_require__("../../../core/esm5/core.js");
// Importer les class Http et Response pour faire des requêtes
var http_1 = __webpack_require__("../../../http/esm5/http.js");
// Importer le sytème de gestion de Promise
__webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
//
/*
Exporter le service
*/
var TasksService = /** @class */ (function () {
    // Injecter la class Http dans le service
    function TasksService(http) {
        var _this = this;
        this.http = http;
        // Créer une variable pour l'adresse de l'API
        // private apiUrl: string = `http://localhost:3001/api`;
        this.apiUrl = "/api";
        /*
        Créer une fonction pour afficher la liste des tâches
        */
        this.getTasks = function () {
            return _this.http.get(_this.apiUrl + "/tasks").toPromise()
                .then(function (data) { return _this.dataFromApi(data); })
                .catch(function (err) { return _this.handleError(err); });
        };
        //
        /*
        Créer une fonction pour ajouter une tâche
        */
        this.addTask = function (newTask) {
            return _this.http.post(_this.apiUrl + "/add-task", newTask).toPromise()
                .then(function (data) { return _this.dataFromApi(data); })
                .catch(function (err) { return _this.handleError(err); });
        };
        //
        /*
        Créer une fonction pour supprimer une tâche
        */
        this.deleteTask = function (id) {
            return _this.http.delete(_this.apiUrl + "/delete-task/" + id).toPromise()
                .then(function (data) { return _this.dataFromApi(data); })
                .catch(function (err) { return _this.handleError(err); });
        };
        //
        /*
        Créer une fonction pour inverser la valuer isDone d'une tâche
        */
        this.setTask = function (task) {
            return _this.http.put(_this.apiUrl + "/set-task-state/" + task._id, task).toPromise()
                .then(function (data) { return _this.dataFromApi(data); })
                .catch(function (err) { return _this.handleError(err); });
        };
    }
    ;
    //
    /*
    Fonctions de traitement des Promises
    */
    // Traitement des réponses JSON
    TasksService.prototype.dataFromApi = function (res) {
        return res.json() || {};
    };
    ;
    // Traitement des erreurs
    TasksService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Promise.reject(errMsg);
    };
    ;
    TasksService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TasksService);
    return TasksService;
}());
exports.TasksService = TasksService;
//


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
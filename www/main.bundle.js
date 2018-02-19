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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_tasks_service__ = __webpack_require__("../../../../../src/app/services/tasks.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
Importer les class du composant
*/

// Importer le service

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
            isDone: false
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
                    isDone: false
                };
            })
                .catch(function (err) { return console.error(err); });
        };
        // Fonction pour éditer une tâche
        this.setTask = function (evt) {
            // Inverser la valeur isDone
            evt.isDone = !evt.isDone;
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            // Renseigner le service dans le tableau de providers
            providers: [__WEBPACK_IMPORTED_MODULE_1__services_tasks_service__["a" /* TasksService */]]
        })
        //
        /*
        Exporter le composant
        */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_tasks_service__["a" /* TasksService */]])
    ], AppComponent);
    return AppComponent;
}());

;
//


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__partials_todo_form_todo_form_component__ = __webpack_require__("../../../../../src/app/partials/todo-form/todo-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__partials_single_task_single_task_component__ = __webpack_require__("../../../../../src/app/partials/single-task/single-task.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// Importer la class pour utiliser le ngModel

// Importer la class pour utiliser les requêtes serveur




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__partials_todo_form_todo_form_component__["a" /* TodoFormComponent */],
                __WEBPACK_IMPORTED_MODULE_6__partials_single_task_single_task_component__["a" /* SingleTaskComponent */]
            ],
            // Renseigner les modules dans le tableau des imports
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/partials/single-task/single-task.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleTaskComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Importer la class Input pour récupérer la valeur d'une variable du composant parent

var SingleTaskComponent = /** @class */ (function () {
    function SingleTaskComponent() {
        var _this = this;
        // Définir les événements
        this.setTask = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */];
        this.deleteTask = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */];
        // Définir les fonction pour émettre les événements
        this.emitSetTask = function (item) {
            _this.setTask.emit(item);
        };
        this.emitDeleteTask = function (id) {
            _this.deleteTask.emit(id);
        };
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], SingleTaskComponent.prototype, "singleItem", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], SingleTaskComponent.prototype, "setTask", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], SingleTaskComponent.prototype, "deleteTask", void 0);
    SingleTaskComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-single-task',
            styles: [".taskDone{ opacity: .5 }"],
            template: "\n    <article class=\"singleTask\">\n      <div [ngClass]=\"{ taskDone: singleItem.isDone }\" >\n        <h3>{{singleItem.title}} <b>{{singleItem.type}}</b></h3>\n        <p>{{singleItem.content}}</p>\n      </div>\n      <aside>\n        <button (click)=\"emitSetTask(singleItem)\"><span *ngIf=\"singleItem.isDone\"><i class=\"fas fa-undo-alt\"></i></span><span *ngIf=\"!singleItem.isDone\"><i class=\"fas fa-check\"></i></span></button>\n        <button (click)=\"emitDeleteTask(singleItem._id)\"><i class=\"fas fa-trash-alt\"></i></button>\n      </aside>\n    </article>\n  "
        })
    ], SingleTaskComponent);
    return SingleTaskComponent;
}());



/***/ }),

/***/ "../../../../../src/app/partials/todo-form/todo-form.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- \nBinding d'événement\n-->\n<button id=\"addTask\" (click)=\" addNewTask = !addNewTask \"><span *ngIf=\"!addNewTask\"><i class=\"fas fa-plus-circle\"></i> Ajouter</span><span *ngIf=\"addNewTask\"><i class=\"fas fa-times-circle\"></i> Annuler</span></button>\n<form action=\"test.php\" (submit)=\"submitForm()\" [ngClass]=\"{open: addNewTask}\">\n    <!-- \n    Utilisation du ngModel : data binding aller/retour\n  -->\n  <fieldset>\n    <label for=\"todoTitle\">Titre<b>*</b> <span *ngIf=\"errorMsg.title.active\" >{{ errorMsg.title.msg }}</span> </label>\n    <input type=\"text\" name=\"todoTitle\" \n      [(ngModel)]=\"formObject.title\" \n      (focus)=\"errorMsg.title.active = false\"\n    >\n  </fieldset>\n\n  <fieldset>\n    <label for=\"todoContent\">Description</label>\n    <textarea \n      name=\"todoContent\" \n      [(ngModel)]=\"formObject.content\"\n    ></textarea>\n  </fieldset>\n\n  <fieldset>\n    <label for=\"todoType\">Type<b>*</b> <span *ngIf=\"errorMsg.type.active\" >{{ errorMsg.type.msg }}</span></label>\n    <select name=\"todoType\" \n      [(ngModel)]=\"formObject.type\" \n      (focus)=\"errorMsg.type.active = false\"\n    >\n      <option value=\"NULL\">- Sélectionner -</option>\n      <option value=\"WORK\"><i class=\"fas fa-plus-circle\"></i> Travail</option>\n      <option value=\"FUN\">Loisir</option>\n    </select>\n  </fieldset>\n\n  <button type=\"submit\">Ajouter</button> \n</form>"

/***/ }),

/***/ "../../../../../src/app/partials/todo-form/todo-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
Importer les class pour générer un événement à capter dans le composant parent
*/

var TodoFormComponent = /** @class */ (function () {
    function TodoFormComponent() {
        var _this = this;
        // Création d'un événement
        this.sendData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */];
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Object)
    ], TodoFormComponent.prototype, "formObject", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Output */])(),
        __metadata("design:type", Object)
    ], TodoFormComponent.prototype, "sendData", void 0);
    TodoFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-todo-form',
            template: __webpack_require__("../../../../../src/app/partials/todo-form/todo-form.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TodoFormComponent);
    return TodoFormComponent;
}());

;


/***/ }),

/***/ "../../../../../src/app/services/tasks.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
Importer les class
*/

// Importer les class Http et Response pour faire des requêtes

// Importer le sytème de gestion de Promise

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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], TasksService);
    return TasksService;
}());

//


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
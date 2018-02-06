import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//import { Tarefa } from './../model/tarefa';
//import { TarefaFilter } from './../controller/tarefa.filter';
import { GenericService } from './../generics/generic.service';

@Injectable()
export class AgendaService extends GenericService {

    constructor( http: Http, router: Router ) { 
        super( http, router, "tarefa" );
    }
    
}
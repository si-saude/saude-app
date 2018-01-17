import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Tarefa } from './../model/tarefa';

@Injectable()
export class TransferDataService {
    private tarefa: Tarefa;
    
    constructor(protected http: Http, protected router: Router ) {}
    
    getTarefa() {
        return this.tarefa;
    }
    
    setTarefa(tarefa: Tarefa) {
        this.tarefa = tarefa;
    }
}
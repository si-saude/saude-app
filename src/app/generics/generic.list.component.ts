import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { MaterializeDirective, MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../global';
import { GenericFilter } from './generic.filter';
import { GenericService } from './generic.service';

export abstract class GenericListComponent<T> implements OnInit {
    protected titulo:string;
    protected corTitulo;
    protected formulario: FormGroup;
    protected array: Array<T>;
    protected paginas: number[];
    protected paginasAtuais: Array<number>;
    protected msgError: string;
    protected verifyError: boolean;
    protected verifyEmptyPaginas: boolean;
    protected msgEmptyPaginas: string;
    protected colorEmptyPaginas: string;
    protected showPreload: boolean;
    protected msgPreload: string;
    protected modalActions;
    protected modalDelete;
    protected modelParams;
    private flagDelete;
    
    constructor(protected service: GenericService, protected filter: GenericFilter) {
        this.corTitulo = GlobalVariable.COLOR_TITLE;
        this.msgError = '';
        this.verifyError = false;
        this.verifyEmptyPaginas = false;
        this.msgEmptyPaginas = "Nenhum registro encontrado.";
        this.colorEmptyPaginas = "orange";
        this.showPreload = true;
        this.msgPreload = "Aguarde processamento...";
        this.modalActions = new EventEmitter<string|MaterializeAction>();
        this.modalDelete = new EventEmitter<string|MaterializeAction>();
        this.modelParams = [{
            dismissible: false,
            complete: function() { }
        }];
    }
    
    ngOnInit() {
        this.service.list(this.filter)
            .then(res => {
                this.showPreload = false;
                this.array = JSON.parse(JSON.stringify(res.json())).list;
                this.paginas = this.getPaginas(res.json().total);
                this.paginator();
                if (res.json().total === 0){
                    this.verifyEmptyPaginas = true;
                } else {
                    this.verifyEmptyPaginas = false;
                }
            })
            .catch(error => {
                this.showPreload = false;
                this.verifyError = true;
                this.msgError = error.text();
            })
    }
    
    getPaginas(total: number) {
        let pageSize = this.filter.getPageSize();
        if ( total % pageSize > 0 ) {
            return Array(Math.floor((total / pageSize)+1)); 
        } else {
            return Array(total / pageSize);
        }
    }
    
    goToPage(index: number) {
        this.showPreload = true;
        if (index < 1 || index > this.paginas.length) {
            this.showPreload = false;
            return;
        }
        
        this.filter.setPageNumber(index);
        this.service.list(this.filter)
            .then(res => {
                this.showPreload = false;
                this.array = JSON.parse(JSON.stringify(res.json())).list;
                this.paginas = this.getPaginas(res.json().total);
                this.paginator();
             })
             .catch(error => {
                 console.log(error);
             });
    }
    
    activePage(index: number) {
        if (index === this.filter.getPageNumber()) {
            return 'active';
        } else {
            return '';
        }
    }
    
    paginator() {
        let ini = this.filter.getPageNumber() - 5;
        let fim = this.filter.getPageNumber() + 5;

        while( ini < 1 ) {
            ini++;
            fim++;
        }
        
        while( fim > this.paginas.length ) {
            fim--;
            ini--;
        } 
        
        while( ini < 1) {
            ini++;
        }

        this.paginasAtuais = Array((fim-ini)+1);
        let pos = 0;
        for ( let i = ini; i <= fim; i++ ){
            this.paginasAtuais[pos] = i;
            pos++;
        }
    }
    
    setFilter() {
        this.showPreload = true;
        this.service.list(this.filter)
        .then(res => {
            this.array = JSON.parse(JSON.stringify(res.json())).list;
            this.paginas = this.getPaginas(res.json().total);
            if (res.json().total === 0) {
                this.verifyEmptyPaginas = true;
            } else {
                this.verifyEmptyPaginas = false;
            }
            this.showPreload = false;
         });
    }
    
    delete(id) {
        this.modalDelete.emit({action:"modal",params:['open']});
        this.flagDelete = id; 
    }

    closeModalDelete() {
        this.modalDelete.emit({action:"modal",params:['close']});
    }
    
    openModal() {
        this.modalActions.emit({action:"modal",params:['open']});
    }
    
    closeModal() {
        this.modalActions.emit({action:"modal",params:['close']});
    }
    
    confirmDelete() {
        this.showPreload = true;
        this.service.delete(this.flagDelete)
            .then(res => {
                this.showPreload = false;
                window.location.reload();
            })
            .catch(error => {
                this.showPreload = false;
                console.log(error.text());
            })
    }
}
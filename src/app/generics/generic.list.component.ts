import { EventEmitter, OnInit } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../global';
import { GenericFilter } from './generic.filter';
import { GenericComponent } from './generic.component';
import { GenericService } from './generic.service';
import { TypeFilter } from './type.filter';

export abstract class GenericListComponent<T, F extends GenericFilter> extends GenericComponent implements OnInit {
    protected titulo:string;
    protected corTitulo;
    protected array: Array<T>;
    protected paginas: number[];
    protected paginasAtuais: Array<number>;
    protected msgError: string;
    protected verifyError: boolean;
    protected verifyEmptyPaginas: boolean;
    protected msgEmptyPaginas: string;
    protected colorEmptyPaginas: string;
    protected modalActions;
    protected modalDelete;
    protected modalParams;
    protected typeFilter;
    private tempDelete;
    
    constructor(protected service: GenericService, protected filter: F) {
        super();
        this.corTitulo = GlobalVariable.COLOR_TITLE;
        this.msgError = '';
        this.verifyError = false;
        this.verifyEmptyPaginas = false;
        this.msgEmptyPaginas = "Nenhum registro encontrado.";
        this.colorEmptyPaginas = "orange";
        this.typeFilter = TypeFilter;
        this.modalActions = new EventEmitter<string|MaterializeAction>();
        this.modalDelete = new EventEmitter<string|MaterializeAction>();
        this.modalParams = [{
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
                this.colorError = "red";
                this.msgError = error.text();
            })
    }
    
    typeFilters(): Array<string> {
        var keys = Object.keys(this.typeFilter);
        return keys.slice(keys.length / 2);
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
                 this.showPreload = false;
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
                this.showPreload = false;
                this.array = JSON.parse(JSON.stringify(res.json())).list;
                this.paginas = this.getPaginas(res.json().total);
                this.paginator();
                if (res.json().total === 0) {
                    this.verifyEmptyPaginas = true;
                } else {
                    this.verifyEmptyPaginas = false;
                }
             })
             .catch(error => {
                 this.showPreload = false;
                 console.log(error);
             })
    }
    
    delete(id) {
        this.modalDelete.emit({action:"modal",params:['open']});
        this.tempDelete = id; 
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
        this.service.delete(this.tempDelete)
            .then(res => {
                this.showPreload = false;
                window.location.reload();
            })
            .catch(error => {
                this.showPreload = false;
                this.verifyError = true;
                this.colorError = "red";
                this.msgError = error.text();
                console.log(error.text());
            })
    }
    
    parseDataToObjectDatePicker(data) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split("T");
        let datas = s[0].split("-");
        if ( datas[2].substring(0,1) === "0" ) {
            datas[2] = datas[2].replace("0", "");
        }
        let o = Object.create({date: { year: datas[0], month: datas[1], day: datas[2] }});
        return o;   
    }
        
    parseDatePickerToDate(data) {
        if (data === undefined || data === null) {
            return null;
        } else if (data instanceof Date) {
            return data;
        }   
        let d: Date = new Date(data.date.year, data.date.month - 1, data.date.day);
        return d;
    }
}
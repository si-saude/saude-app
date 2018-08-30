import { EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../global';
import { HTMLStatus } from './../html-status';
import { GenericFilter } from './generic.filter';
import { GenericComponent } from './generic.component';
import { GenericService } from './generic.service';
import { TypeFilter } from './type.filter';
import { ChildGuard } from './child.guard';
import { DateFilter } from './date.filter';

export abstract class GenericListComponent<T, F extends GenericFilter, C extends ChildGuard> extends GenericComponent implements OnInit, OnDestroy {
    @ViewChild( 'arquivo' ) inputElArquivo: ElementRef;
    protected titulo: string;
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
    protected modalImport;
    protected typeFilter;
    protected canImport;
    protected tempDelete;
    protected openModalDelete: boolean;
    protected canRemove: boolean;
    private listComponent: any;
    
    constructor( protected service: GenericService, protected filter: F, protected guard: C, router: Router ) {
        super(router);
        this.corTitulo = GlobalVariable.COLOR_TITLE;
        this.msgError = '';
        this.verifyError = false;
        this.verifyEmptyPaginas = false;
        this.msgEmptyPaginas = "Nenhum registro encontrado.";
        this.colorEmptyPaginas = "orange";
        this.typeFilter = TypeFilter;
        this.modalActions = new EventEmitter<string | MaterializeAction>();
        this.modalDelete = new EventEmitter<string | MaterializeAction>();
        this.modalImport = new EventEmitter<string | MaterializeAction>();
        this.canImport = false;
        this.canRemove = false;
        this.openModalDelete = false;
        this.listComponent = this;
    }

    
    enterFilter(event){        
        if(event.keyCode == 13 ){
            this.setFilter();
            this.closeModal();
        }
    }
    
    
    ngOnInit() {
        this.list();
        
        setTimeout(() => {
            this.canRemove = this.guard.canRemove;
        }, 200);
    }

    typeFilters(): Array<string> {
        var keys = Object.keys( this.typeFilter );
        return keys.slice( keys.length / 2 );
    }

    getPaginas( total: number ) {
        let pageSize = this.filter.getPageSize();
        if ( total % pageSize > 0 ) {
            return Array( Math.floor(( total / pageSize ) + 1 ) );
        } else {
            return Array( total / pageSize );
        }
    }

    goToPage( index: number ) {
        this.showPreload = true;
        if ( index < 1 || index > this.paginas.length ) {
            this.showPreload = false;
            return;
        }
        this.filter.setPageNumber( index );
        this.list();
    }

    activePage( index: number ) {
        if ( index === this.filter.getPageNumber() ) {
            return 'active';
        } else {
            return '';
        }
    }

    paginator() {
        let ini = this.filter.getPageNumber() - 5;
        let fim = this.filter.getPageNumber() + 5;

        while ( ini < 1 ) {
            ini++;
            fim++;
        }

        while ( fim > this.paginas.length ) {
            fim--;
            ini--;
        }

        while ( ini < 1 ) {
            ini++;
        }

        this.paginasAtuais = Array(( fim - ini ) + 1 );
        let pos = 0;
        for ( let i = ini; i <= fim; i++ ) {
            this.paginasAtuais[pos] = i;
            pos++;
        }
    }

    setFilter() {
        this.showPreload = true;
        this.list();
    }

    closeModalDelete( valor ) {
        if ( valor != false )
            this.array.splice(this.array.indexOf(this.array.find( a => a['id'] == this.tempDelete )), 1);
        let b: boolean = false;
        this.openModalDelete = b;
        this.showPreload = false;
    }

    openModal() {
        this.modalActions.emit( { action: "modal", params: ['open'] } );
    }

    closeModal() {
        this.modalActions.emit( { action: "modal", params: ['close'] } );
    }
    
    openModalImport() {
        this.modalImport.emit( { action: "modal", params: ['open'] } );
    }
    
    closeModalImport() {
        this.modalImport.emit( { action: "modal", params: ['close'] } );
    }
    
    delete( id ) {
        this.tempDelete = id;
        let b: boolean = true;
        this.openModalDelete = b;
    }

    
    isNullOrUndefined(object){
        if ( object === undefined || object === null || object === '') 
            return true; 
        else{
            return false;
        
        }
    }
    
    initializerDateFilter(data: DateFilter){
        if (this.isNullOrUndefined(data) ) {
            return undefined;
        }
        else{
            if(!this.isNullOrUndefined(data.getInicioCustomDate()))                 
                data.getInicio();
            
            if(!this.isNullOrUndefined(data.getFimCustomDate()))  
                data.getFim();
        }
    }
    
    
    parseDataToObjectDatePicker( data ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split( "T" );
        let datas = s[0].split( "-" );
        if ( datas[2].substring( 0, 1 ) === "0" ) {
            datas[2] = datas[2].replace( "0", "" );
        }
        if ( datas[1].substring( 0, 1 ) === "0" ) {
            datas[1] = datas[1].replace( "0", "" );
        }
        let o = Object.create( { date: { year: datas[0], month: datas[1], day: datas[2] } } );
        return o;
    }

    parseDatePickerToDate( data ) {
        if ( data === undefined || data === null ) {
            return null;
        } else if ( data instanceof Date ) {
            return data;
        }
        let d: Date = new Date( data.date.year, data.date.month - 1, data.date.day );
        return d;
    }

    list() {
        this.service.list( this.filter )        
            .then( res => {
                this.canImport = true;
                this.showPreload = false;
                this.array = JSON.parse( JSON.stringify( res.json() ) ).list;
                this.paginas = this.getPaginas( res.json().total );
                this.paginator();
                if ( res.json().total === 0 ) {
                    this.verifyEmptyPaginas = true;
                } else {
                    this.verifyEmptyPaginas = false;
                }
            } )
            .catch( error => {
                this.showPreload = false;
                this.canImport = false;
                this.catchConfiguration( error );
            } )
    }
    
    importFile() {
        let arquivo = undefined;
        
        if(this.inputElArquivo.nativeElement.files.length > 0){
            arquivo = this.inputElArquivo.nativeElement.files[0];
            this.showPreload = true;
            this.service.sendFile(arquivo)
                .then(res => {
                    this.showPreload = false;
                    location.reload();
                })
                .catch(error => {
                    this.catchConfiguration(error);
                })
        } else {
            console.log('falta selecionar arquivo');
        }
    }
    
    ngOnDestroy() {
    }
}
import { EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../global';
import { HTMLStatus } from './../html-status';
import { GenericFilter } from './generic.filter';
import { GenericComponent } from './generic.component';
import { GenericService } from './generic.service';
import { TypeFilter } from './type.filter';
import { ChildGuard } from './child.guard';

export abstract class GenericListComponent<T, F extends GenericFilter, C extends ChildGuard> extends GenericComponent implements OnInit {
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
    protected modalParams;
    protected typeFilter;
    protected canImport;
    private tempDelete;
    protected canRemove: boolean;

    constructor( protected service: GenericService, protected filter: F, protected guard: C ) {
        super();
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
        this.modalParams = [{
            dismissible: false,
            complete: function() { }
        }];
        this.canImport = false;
        this.canRemove = false;

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

    delete( id ) {
        this.modalDelete.emit( { action: "modal", params: ['open'] } );
        this.tempDelete = id;
    }

    closeModalDelete() {
        this.modalDelete.emit( { action: "modal", params: ['close'] } );
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

    confirmDelete() {
        this.showPreload = true;
        this.service.delete( this.tempDelete )
            .then( res => {
                this.showPreload = false;
                window.location.reload();
            } )
            .catch( error => {
                this.catchConfiguration(error);
            } )
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
}
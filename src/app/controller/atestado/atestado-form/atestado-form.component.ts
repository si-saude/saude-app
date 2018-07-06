import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Atestado } from './../../../model/atestado';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtestadoBuilder } from './../atestado.builder';
import { AtestadoService } from './../atestado.service';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';
import { CatNumeroAutocomplete } from './../../cat/cat-numero.autocomplete';

@Component( {
    selector: 'app-atestado-form',
    templateUrl: './atestado-form.html',
    styleUrls: ['./atestado-form.css', './../../../../assets/css/form-component.css']
} )
export class AtestadoFormComponent extends GenericFormComponent implements OnInit {
    private atestado: Atestado;
    private statuses: Array<string>;
    @ViewChild( 'anexo' ) inputElAnexo: ElementRef;
    private edit: boolean = false;
    private autoCompleteEmp: EmpregadoNomeAutocomplete;
    private autoCompleteCat: CatNumeroAutocomplete;

    constructor( private route: ActivatedRoute,
        private atestadoService: AtestadoService,
        router: Router ) {
        super( atestadoService, router );

        this.goTo = "atestado";
        this.atestado = new AtestadoBuilder().initialize( this.atestado );
        this.statuses = new Array<string>();
        this.autoCompleteEmp = new EmpregadoNomeAutocomplete( this.atestadoService.getEmpregadoService() );
        this.autoCompleteCat = new CatNumeroAutocomplete( this.atestadoService.getCatService() );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.atestado = new AtestadoBuilder().clone( res.json() );
                            this.edit = true;
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );

        this.getStatuses();
    }

    getStatuses() {
        this.atestadoService.getStatuses()
            .then( res => {
                this.statuses = Object.keys( res.json() ).sort();
            } )
            .catch( error => {
                console.log( "Erro ao retornar status." );
            } )
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

    save() {
        if ( !this.edit ) {
            let i: number = 0;
            let total: number = 0;
            let anexo = undefined;

            if ( this.inputElAnexo.nativeElement.files.length > 0 ) {
                anexo = this.inputElAnexo.nativeElement.files[0];
                total++;
            }

            if ( total > 0 ) {
                let component = this;
                let atestado: Atestado = new AtestadoBuilder().clone( component.atestado );

                if ( anexo != undefined ) {
                    let readerAnexo = new FileReader();

                    readerAnexo.onload = function() {
                        let arrayBuffer: ArrayBuffer = readerAnexo.result;
                        let array = new Uint8Array( arrayBuffer );
                        atestado.setAnexo( array );
                        component.callSave( ++i, total, atestado );
                    }

                    readerAnexo.readAsArrayBuffer( new Blob( [anexo] ) );
                }
            } else {
                this.salvar( new AtestadoBuilder().clone( this.atestado ) );
            }
        } else {
            console.log('teste1');
            this.salvar( new AtestadoBuilder().clone( this.atestado ) );
        }
    }

    callSave( i: number, total: number, atestado: Atestado ) {
        if ( i == total ) {
            this.salvar( atestado );
        }
    }

    salvar( atestado ) {
        super.save( atestado );
    }

    showTextToast( text, time = 60000 ) {
        if ( text == "" ) return;

        this.toastParams = [text, time];
        this.globalActions.emit( 'toast' );
    }

    closeTooltip() {
        $( ".toast" ).remove();
    }
}
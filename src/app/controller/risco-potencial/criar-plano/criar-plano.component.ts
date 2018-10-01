import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoPotencial } from './../../../model/risco-potencial';
import { RiscoPotencialBuilder } from './../risco-potencial.builder';
import { RiscoPotencialService } from './../risco-potencial.service';
import { RiscoEmpregado } from './../../../model/risco-empregado';
import { RiscoEmpregadoBuilder } from './../../risco-empregado/risco-empregado.builder';
import { ConfirmSaveComponent } from './../../../includes/confirm-save/confirm-save.component';

@Component( {
    selector: 'app-criar-plano',
    templateUrl: './criar-plano.html',
    styleUrls: ['./criar-plano.css', './../../../../assets/css/form-component.css']
} )
export class CriarPlanoComponent extends GenericFormComponent implements OnInit {
    private riscoPotencial: RiscoPotencial;
    private idsEquipes: Array<number>;
    private selectedRiscoEmpregados: Array<RiscoEmpregado>;
    @ViewChild( ConfirmSaveComponent) confirmSaveComponent: ConfirmSaveComponent;

    constructor( private route: ActivatedRoute,
        private riscoPotencialService: RiscoPotencialService,
        router: Router ) {
        super( riscoPotencialService, router );

        this.goTo = "risco-potencial";

        this.idsEquipes = new Array<number>();
        this.riscoPotencial = new RiscoPotencialBuilder().initialize( new RiscoPotencial() );
        this.selectedRiscoEmpregados = new RiscoEmpregadoBuilder().initializeList( new Array<RiscoEmpregado>() );
    }

    ngOnInit() {
        let component = this;
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.riscoPotencialService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.riscoPotencial = new RiscoPotencialBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            component.showPreload = false;
                            component.catchConfiguration( error );
                        } )
                }
            } );
    }

    verifyActive( index ) {
        if ( !$( '.item-collection' + index ).attr( 'class' ).includes( 'active' ) )
            if ( this.idsEquipes.find( e => e == this.riscoPotencial.getRiscoEmpregados()[index].getEquipe().getId() ) == undefined ) {
                $( '.item-collection' + index ).addClass( 'active' );
                this.idsEquipes.push( this.riscoPotencial.getRiscoEmpregados()[index].getEquipe().getId() );
                this.riscoPotencial.getRiscoEmpregados()[index].setAtivo( true );
                this.selectedRiscoEmpregados.push( this.riscoPotencial.getRiscoEmpregados()[index] );
            } else {
                this.toastParams = ["Equipe escolhida anteriormente", 4000];
                this.globalActions.emit( 'toast' );
            }
        else {
            $( '.item-collection' + index ).removeClass( 'active' );
            this.riscoPotencial.getRiscoEmpregados()[index].setAtivo( false );
            this.idsEquipes.splice( this.idsEquipes.indexOf( this.riscoPotencial.getRiscoEmpregados()[index].getEquipe().getId() ), 1 );
            this.selectedRiscoEmpregados.splice( this.selectedRiscoEmpregados.indexOf(
                this.riscoPotencial.getRiscoEmpregados()[index] ), 1 );
        }
    }

    save() {
        if ( this.selectedRiscoEmpregados.length != 5 ) {
            this.toastParams = ["Deve-se escolhar cinco equipes.", 4000];
            this.globalActions.emit( 'toast' );
            return;
        }

        this.riscoPotencial.getRiscoEmpregados().forEach( rE => rE.setAtivo( false ) );

        this.selectedRiscoEmpregados.forEach( sRE => {
            this.riscoPotencial.getRiscoEmpregados().find( rE => rE.getId() == sRE.getId() ).setAtivo( true );
        } );

        this.showPreload = true;
        this.canDeactivate = true;
        this.riscoPotencialService.criarPlano( new RiscoPotencialBuilder().clone( this.riscoPotencial ) )
            .then( res => {
                this.confirmSaveComponent.setGoTo("$*close*$");
                this.processReturn( true, res );
            } )
            .catch( error => {
                this.processReturn( false, error );
            } );
    }

    ngOnDestroy() {
        if ( this.inscricao != undefined )
            this.inscricao.unsubscribe();
    }
}

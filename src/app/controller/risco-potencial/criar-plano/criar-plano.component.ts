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

@Component( {
    selector: 'app-criar-plano',
    templateUrl: './criar-plano.html',
    styleUrls: ['./criar-plano.css', './../../../../assets/css/form-component.css']
} )
export class CriarPlanoComponent extends GenericFormComponent implements OnInit {
    private riscoPotencial: RiscoPotencial;
    private idsEquipes: Array<number>;
    private selectedRiscoEmpregados: Array<RiscoEmpregado>;
    
    constructor( private route: ActivatedRoute,
            private riscoPotencialService: RiscoPotencialService,
            router: Router) {
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

                    this.riscoPotencialService.get(id)
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
        if ( !$('.item-collection'+index).attr('class').includes('active') )
            if ( this.idsEquipes.find( e => e == this.riscoPotencial.getRiscoEmpregados()[index].getEquipe().getId() ) == undefined ) {
                $('.item-collection'+index).addClass('active');
                this.idsEquipes.push( this.riscoPotencial.getRiscoEmpregados()[index].getEquipe().getId() );
                this.selectedRiscoEmpregados.push( this.riscoPotencial.getRiscoEmpregados()[index] );
            } else {
                this.toastParams = ["Equipe escolhida anteriormente", 4000];
                this.globalActions.emit( 'toast' );
            }
        else {
            $( '.item-collection'+index ).removeClass( 'active' );
            this.idsEquipes.splice( this.idsEquipes.indexOf( this.riscoPotencial.getRiscoEmpregados()[index].getEquipe().getId() ), 1 );
            this.selectedRiscoEmpregados.splice( this.selectedRiscoEmpregados.indexOf( 
                    this.riscoPotencial.getRiscoEmpregados()[index] ), 1 );
        }
    }
    
    save() {
        this.riscoPotencial.setRiscoEmpregados( new Array<RiscoEmpregado>() );
        this.selectedRiscoEmpregados.forEach( sRE => {
            this.riscoPotencial.getRiscoEmpregados().push( sRE );
        });
        
        super.save( new RiscoPotencialBuilder().clone( this.riscoPotencial ) );
    }
    
    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}

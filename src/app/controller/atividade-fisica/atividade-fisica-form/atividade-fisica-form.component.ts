import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { AtividadeFisica } from './../../../model/atividade-fisica';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AtividadeFisicaBuilder } from './../atividade-fisica.builder';
import { AtividadeFisicaService } from './../atividade-fisica.service';

@Component( {
    selector: 'app-atividade-fisica-form',
    templateUrl: './atividade-fisica-form.html',
    styleUrls: ['./atividade-fisica-form.css', './../../../../assets/css/form-component.css']
} )
export class AtividadeFisicaFormComponent extends GenericFormComponent implements OnInit {
    private atividadeFisica: AtividadeFisica;
    private classificacoes: Array<string>;
    
    constructor( private route: ActivatedRoute,
        private atividadeFisicaService: AtividadeFisicaService,
        router: Router) {
        super( atividadeFisicaService, router );

        this.goTo = "atividade-fisica";
        this.atividadeFisica = new AtividadeFisicaBuilder().initialize( this.atividadeFisica );
        this.classificacoes = new Array<string>();
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
                            this.atividadeFisica = new AtividadeFisicaBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getClassificacao();
    }
    
    getClassificacao() {
        this.atividadeFisicaService.getClassificacao() 
            .then(res => {
                this.classificacoes = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new AtividadeFisicaBuilder().clone( this.atividadeFisica ) );
    }
    
    changeTotal() {
        let mult: number = 0;
        setTimeout(() => {
            if ( this.atividadeFisica.getMinuto() != undefined ) {
                if ( this.atividadeFisica.getSegunda() )
                    mult++;
                if ( this.atividadeFisica.getTerca() )
                    mult++;
                if ( this.atividadeFisica.getQuarta() )
                    mult++;
                if ( this.atividadeFisica.getQuinta() )
                    mult++;
                if ( this.atividadeFisica.getSexta() )
                    mult++;
                if ( this.atividadeFisica.getSabado() )
                    mult++;
                if ( this.atividadeFisica.getDomingo() )
                    mult++;
                this.atividadeFisica.setTotalMinuto(mult*this.atividadeFisica.getMinuto());
            }
        }, 200);
    }
}
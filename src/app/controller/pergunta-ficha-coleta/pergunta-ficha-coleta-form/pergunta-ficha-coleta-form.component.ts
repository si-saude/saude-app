import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { PerguntaFichaColetaService } from './../pergunta-ficha-coleta.service';
import { PerguntaFichaColeta } from './../../../model/pergunta-ficha-coleta';
import { PerguntaFichaColetaBuilder } from './../pergunta-ficha-coleta.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-pergunta-ficha-coleta-form',
    templateUrl: './pergunta-ficha-coleta-form.html',
    styleUrls: ['./../../../../assets/css/form-component.css', './pergunta-ficha-coleta-form.css']
} )
export class PerguntaFichaColetaFormComponent extends GenericFormComponent implements OnInit { 
    perguntaFichaColeta: PerguntaFichaColeta;
    grupos: Array<string>;
    tipos: Array<string>;
    
    constructor( private route: ActivatedRoute,
            private perguntaFichaColetaService: PerguntaFichaColetaService,
            router: Router) { 
            super(perguntaFichaColetaService, router);
            
            this.goTo = "pergunta-ficha-coleta";
            this.perguntaFichaColeta = new PerguntaFichaColetaBuilder().initialize(this.perguntaFichaColeta);
        }
    
    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.perguntaFichaColetaService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.perguntaFichaColeta = new PerguntaFichaColetaBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getGrupos();
        this.getTipos();
    }
    
    save() {
        super.save(new PerguntaFichaColetaBuilder().clone(this.perguntaFichaColeta));
    }
    
    getGrupos(){
        this.perguntaFichaColetaService.getGrupos()
        .then(res => {
            this.grupos = Object.keys( res.json() ).sort();
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    getTipos(){
        this.perguntaFichaColetaService.getTipos()
        .then(res => {
            this.tipos = Object.keys( res.json() ).sort();
        })
        .catch(error => {
            console.log(error);
        });
    }
    
}
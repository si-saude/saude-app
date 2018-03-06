import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { PerguntaFichaColetaService } from './../pergunta-ficha-coleta.service';
import { PerguntaFichaColeta } from './../../../model/pergunta-ficha-coleta';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { ItemPerguntaFichaColeta } from './../../../model/item-pergunta-ficha-coleta';
import { ItemPerguntaFichaColetaBuilder } from './../../item-pergunta-ficha-coleta/item-pergunta-ficha-coleta.builder';
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
    equipes: Array<Equipe>;
    equipesSelecteds: Array<Equipe>;
    
    constructor( private route: ActivatedRoute,
            private perguntaFichaColetaService: PerguntaFichaColetaService,
            router: Router) { 
            super(perguntaFichaColetaService, router);
            
            this.goTo = "pergunta-ficha-coleta";
            this.perguntaFichaColeta = new PerguntaFichaColetaBuilder().initialize(this.perguntaFichaColeta);
            this.equipesSelecteds = new Array<Equipe>();
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
                            console.log(this.perguntaFichaColeta);
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getGrupos();
        this.getTipos();
        this.getEquipes();
    }
    
    save() {
        console.log(new PerguntaFichaColetaBuilder().clone(this.perguntaFichaColeta));
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
    
    getEquipes(){
        this.perguntaFichaColetaService.getEquipes()
            .then(res => {
                this.equipes = new EquipeBuilder().cloneList( res.json() );
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    addLabel( label ) {
        let itemPerguntaFichaColeta = new ItemPerguntaFichaColetaBuilder().initialize(new ItemPerguntaFichaColeta());
        itemPerguntaFichaColeta.setLabel(label);
        
        this.perguntaFichaColeta.getItens().push( itemPerguntaFichaColeta );
    }
    
    removeLabel( index ) {
        this.perguntaFichaColeta.getItens().splice(index, 1);
    }
    
    addEquipe(valor: number) {
        if ( valor != 0 ) {
            let e = this.equipesSelecteds.find(e => e.getId() == valor);
            if ( e == undefined ) {
                let equipe: Equipe = this.equipes.find(e => e.getId() == valor);
                this.equipesSelecteds.push(equipe);
                this.perguntaFichaColeta.setEquipes(this.equipesSelecteds);
            }
        }
    }

    removeEquipe(i: number) {
        this.perguntaFichaColeta.getEquipes().splice(i, 1);
    }

}
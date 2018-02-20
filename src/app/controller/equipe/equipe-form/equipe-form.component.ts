import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Equipe } from './../../../model/equipe';
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { ProfissionalSaudeService } from './../../profissional-saude/profissional-saude.service';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { EquipeBuilder } from './../equipe.builder';
import { EquipeService } from './../equipe.service';

@Component( {
    selector: 'app-equipe-form',
    templateUrl: './equipe-form.html',
    styleUrls: ['./equipe-form.css', './../../../../assets/css/form-component.css']
} )
export class EquipeFormComponent extends GenericFormComponent implements OnInit { 
    equipe: Equipe;
    autocompleteCoordenador;
    coordenadores: Array<Profissional>;
    validCoordenador: string;
    
    constructor( private route: ActivatedRoute,
            private equipeService: EquipeService,
            private profissionalService: ProfissionalSaudeService,
            router: Router) { 
            super(equipeService, router);
            
            this.goTo = "equipe";
            this.equipe = new EquipeBuilder().initialize(this.equipe);
            this.autocompleteCoordenador = [];
            this.coordenadores = new ProfissionalSaudeBuilder().initializeList(new Array<Profissional>());
            this.validCoordenador = ""; 
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.equipeService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.equipe = new EquipeBuilder().clone(res.json());
                            this.saveArrayCoordenador();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new EquipeBuilder().clone(this.equipe));
    }   
    
    getCoordenador() {
        if ( this.validCoordenador == this.equipe.getCoordenador().getEmpregado().getPessoa().getNome() ) return;
        if ( this.equipe.getCoordenador().getEmpregado().getPessoa().getNome() !== undefined ) {

            let coordenador = this.coordenadores.find( e =>
                e.getEmpregado().getPessoa().getNome() == this.equipe.getCoordenador().getEmpregado().getPessoa().getNome()
            );

            if ( coordenador !== undefined ) {
                this.equipe.setCoordenador( coordenador );
                this.validCoordenador = this.equipe.getCoordenador().getEmpregado().getPessoa().getNome();
            } else this.equipe.setCoordenador( new ProfissionalSaudeBuilder().initialize( new Profissional() ) );
        } else this.equipe.setCoordenador( new ProfissionalSaudeBuilder().initialize( new Profissional() ) );
    }
    
    private oldNomeCoordenador: string;
    selectCoordenador( evento ) {
        if ( this.oldNomeCoordenador != evento ) {
            this.oldNomeCoordenador = evento;
            if ( evento.length > 3 ) {
                this.profissionalService.getProfissionalByNameSimples( evento )
                    .then( res => {
                        this.coordenadores = new ProfissionalSaudeBuilder().cloneList( res.json() );
                        this.autocompleteCoordenador = [this.buildAutocompleteCoordenador( this.coordenadores )];
                    } )
                    .catch( error => {
                        console.log( error );
                    } )
            }
        }
    }
    
    buildAutocompleteCoordenador( coordenadores: Array<Profissional> ) {
        let data = {};
        coordenadores.forEach( item => {
            data[item.getEmpregado().getPessoa().getNome()] = null;
        } );

        let array = {};
        array["data"] = data;

        return array;
    }
    
    saveArrayCoordenador() {
        if ( this.equipe.getCoordenador() != undefined ) 
            this.coordenadores.push(this.equipe.getCoordenador());
    }
    
}
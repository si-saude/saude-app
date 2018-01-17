import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MaterializeDirective,MaterializeAction} from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { Servico } from './../../../model/servico';
import { Equipe } from './../../../model/equipe';
import { Atividade } from './../../../model/atividade';
import { AtividadeBuilder } from './../../atividade/atividade.builder';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ServicoBuilder } from './../servico.builder';
import { ServicoService } from './../servico.service';

@Component( {
    selector: 'app-servico-form',
    templateUrl: './servico-form.html',
    styleUrls: ['./servico-form.css', './../../../../assets/css/form-component.css']
} )
export class ServicoFormComponent extends GenericFormComponent implements OnInit {
    servico: Servico;
    equipes: Array<Equipe>;
    tempoMedio: string;
    grupos: Array<string>;
    
    globalActions = new EventEmitter<string|MaterializeAction>();
    toastParams = ['', 4000];

    constructor( private route: ActivatedRoute,
            private servicoService: ServicoService) { 
            super(servicoService);
            this.goTo = "servico";
            
            this.servico = new ServicoBuilder().initialize(this.servico);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.servicoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.servico = new ServicoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getEquipes();
        this.getGrupos();
    }
    
    getEquipes() {
        this.servicoService.getEquipes()
            .then(res => {
                this.equipes = new EquipeBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    getGrupos() {
        this.servicoService.getGrupos()
            .then(res => {
                this.grupos = Object.keys( res.json() ).sort();
            })
            .catch( error => {
                console.log( error );
            } )
    }
    
    save() {
        super.save(new ServicoBuilder().clone(this.servico));
    }   
    
    addAtividade( index: number ) {
        if ( index == 0 ) {
            this.toastParams = ['Por favor, selecione uma equipe', 4000];
            this.globalActions.emit('toast');
        } else if ( this.tempoMedio == undefined ||
                this.tempoMedio == '' ||
                this.tempoMedio == null ) {
            this.toastParams = ['Por favor, insira o tempo da atividade', 4000];
            this.globalActions.emit('toast');
        } else {
            let equipe = this.equipes.find(e => e.getId() == index);
            if ( this.servico.getAtividades().find(d => d.getEquipe().getId() == equipe.getId()) != undefined ) {
                this.toastParams = ['Equipe selecionada anteriormente', 4000];
                this.globalActions.emit('toast');
                return;
            }
            let atividade: Atividade = new AtividadeBuilder().initialize(new Atividade());
            atividade.setEquipe(equipe);
            atividade.setTempoMedio(Number(this.tempoMedio));
            
            this.servico.getAtividades().push(atividade);
        }
    }

    removeAtividade(i: number) {
        this.servico.getAtividades().splice(i, 1);
    }
    
}
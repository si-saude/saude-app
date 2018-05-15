import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";

import { Equipe } from './../../model/equipe';
import { EquipeBuilder } from './../../controller/equipe/equipe.builder';

@Component( {
    selector: 'app-modal-equipe',
    templateUrl: './modal-equipe.html',
    styleUrls: ['./modal-equipe.css']
} )
export class ModalEquipeComponent{
    @Input() service;
    @Input() showModalEquipe: boolean;
    @Output() equipe: EventEmitter<Equipe>;
    private arrayEquipe: Array<Equipe>;
    modalEquipe;
    modelParams;

    constructor( router: Router ) {
        this.modalEquipe = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: false,
            complete: function() { }
        }];
        this.equipe = new EventEmitter<Equipe>();
    }

    ngOnInit() { 
        this.arrayEquipe = new EquipeBuilder().initializeList(new Array<Equipe>());
        this.fetchEquipe();
    }

    ngOnChanges( changes: SimpleChanges ) {
        if ( changes["showModalEquipe"].currentValue === true )
            setTimeout(() => this.modalEquipe.emit( { action: "modal", params: ["open"] } ), 1 );
    }
    
    fetchEquipe() {
        this.service.getEquipes()
            .then(res => {
                this.arrayEquipe = new EquipeBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar equipes abordagens.");
            })
    }
    
    selectEquipe( equipe: Equipe ) {
        this.equipe.emit(equipe);
        this.cancelarModalEquipe();
    }
    
    cancelarModalEquipe() {
        this.modalEquipe.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalEquipe.emit( { action: "modal", params: ["close"] } );
    }

}
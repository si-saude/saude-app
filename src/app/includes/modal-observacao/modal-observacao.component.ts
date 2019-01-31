import { EventEmitter, SimpleChanges, Component, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ItemRefeicaoPlanoBuilder } from './../../controller/item-refeicao-plano/item-refeicao-plano.builder';
import { ItemRefeicaoPlano } from './../../model/item-refeicao-plano';
import { MaterializeAction } from "angular2-materialize";
import * as $ from 'jquery';
import { GlobalVariable } from './../../../../src/app/global';
import { Util } from './../../generics/utils/util';

@Component( {
    selector: 'app-modal-observacao',
    templateUrl: './modal-observacao.html',
    styleUrls: ['./modal-observacao.css']
} )
export class ModalObservacaoComponent {
    
    private itemRefeicaoPlano: ItemRefeicaoPlano;
    modalObservacao;
    modelParams;
    

    constructor( router: Router) {
        this.modalObservacao = new EventEmitter<string | MaterializeAction>();
        this.modelParams = [{
            dismissible: true
        }];
        this.itemRefeicaoPlano = new ItemRefeicaoPlanoBuilder().initialize(this.itemRefeicaoPlano);
    }
    
    
    openModalObservacao(itemRefeicaoPlano : ItemRefeicaoPlano) {
        this.itemRefeicaoPlano = new ItemRefeicaoPlanoBuilder().initialize(undefined);
        this.itemRefeicaoPlano = itemRefeicaoPlano;
        this.modalObservacao.emit( { action: "modal", params: ['open'] } );
    }

    cancelarModalObservacao() {
        this.modalObservacao.emit( { action: "modal", params: ['close'] } );
    }

    onDestroy() {
        this.modalObservacao.emit( { action: "modal", params: ["close"] } );
    }
    teste(){
        console.log(this.itemRefeicaoPlano);
    }

}
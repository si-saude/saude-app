import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";
import { Atendimento } from './../../model/atendimento';
import { AtendimentoBuilder } from './../../controller/atendimento/atendimento.builder';
import { UtilService } from './../../generics/util.service';

@Component( {
    selector: 'app-atendimento-informacoes-empregado',
    templateUrl: './atendimento-informacoes-empregado.html',
    styleUrls: ['./atendimento-informacoes-empregado.css']
} )
export class AtendimentoInformacoesEmpregadoComponent {
    @Input() atendimento: Atendimento;    
    constructor(private utilService: UtilService) {
        
    }   
    verifyColorGhe(){        
        return (this.atendimento.getFilaAtendimentoOcupacional().getProfissional().getEquipe().getAbreviacao() == 'HIG' && this.atendimento.getFilaEsperaOcupacional().getEmpregado().getId() > 0 &&this.atendimento.getFilaEsperaOcupacional().getEmpregado().getGhe().getId() == 0)              
    }
}
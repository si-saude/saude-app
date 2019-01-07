import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";
import { Atendimento } from './../../model/atendimento';
import { AtendimentoBuilder } from './../../controller/atendimento/atendimento.builder';

@Component( {
    selector: 'app-atendimento-informacoes-empregado',
    templateUrl: './atendimento-informacoes-empregado.html',
    styleUrls: ['./atendimento-informacoes-empregado.css']
} )
export class AtendimentoInformacoesEmpregadoComponent {
    @Input() atendimento: Atendimento;
}
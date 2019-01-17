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
    private tipoAtendimentos: Array<string>;
    
    constructor(private utilService: UtilService) {
        this.tipoAtendimentos = new Array<string>();
    }
    
    ngOnInit() {
        this.getTipoAtendimento();
    }
    
    getTipoAtendimento() {
        this.utilService.getGenericPath("tipo-atendimento")
            .then(res => {
                this.tipoAtendimentos = Object.keys(res.json()).sort();
            })
            .catch(error => {
                console.log(error)
            })
    }
    
}
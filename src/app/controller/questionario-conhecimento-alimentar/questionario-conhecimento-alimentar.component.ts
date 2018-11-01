import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionarioConhecimentoAlimentar } from './../../model/questionario-conhecimento-alimentar';
import { QuestionarioConhecimentoAlimentarService } from './questionario-conhecimento-alimentar.service';
import { QuestionarioConhecimentoAlimentarFilter } from './questionario-conhecimento-alimentar.filter';
import { QuestionarioConhecimentoAlimentarGuard } from './../../guards/guards-child/questionario-conhecimento-alimentar.guard';
import { FilaEsperaOcupacionalFilter } from './../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { AtendimentoFilter } from './../atendimento/atendimento.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-questionario-conhecimento-alimentar',
    templateUrl: './questionario-conhecimento-alimentar.component.html',
    styleUrls: ['./questionario-conhecimento-alimentar.component.css', '../../../assets/css/list-component.css']
} )
export class QuestionarioConhecimentoAlimentarComponent extends GenericListComponent<QuestionarioConhecimentoAlimentar, QuestionarioConhecimentoAlimentarFilter, QuestionarioConhecimentoAlimentarGuard> {
    constructor( service: QuestionarioConhecimentoAlimentarService, questionarioConhecimentoAlimentarGuard: QuestionarioConhecimentoAlimentarGuard, router: Router ) {
        super( service, new QuestionarioConhecimentoAlimentarFilter(), questionarioConhecimentoAlimentarGuard, router );
    }
    
    ngOnInit() {
        super.ngOnInit();
        this.filter.setAtendimento(new AtendimentoFilter());
        this.filter.getAtendimento().setFilaEsperaOcupacional(new FilaEsperaOcupacionalFilter());
        this.filter.getAtendimento().getFilaEsperaOcupacional().setEmpregado(new EmpregadoFilter());
    }
}
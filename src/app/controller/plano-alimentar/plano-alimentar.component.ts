import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PlanoAlimentar } from './../../model/plano-alimentar';
import { PlanoAlimentarService } from './plano-alimentar.service';
import { PlanoAlimentarFilter } from './plano-alimentar.filter';
import { PlanoAlimentarGuard } from './../../guards/guards-child/plano-alimentar.guard';
import { AtendimentoFilter } from './../atendimento/atendimento.filter';
import { FilaEsperaOcupacionalFilter } from './../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { PessoaFilter } from './../pessoa/pessoa.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-plano-alimentar',
    templateUrl: './plano-alimentar.component.html',
    styleUrls: ['./plano-alimentar.component.css', '../../../assets/css/list-component.css']
} )
export class PlanoAlimentarComponent extends GenericListComponent<PlanoAlimentar, PlanoAlimentarFilter, PlanoAlimentarGuard> {

    constructor( service: PlanoAlimentarService, planoAlimentarGuard: PlanoAlimentarGuard, router: Router ) {
        super( service, new PlanoAlimentarFilter(), planoAlimentarGuard, router );
    }
    
    ngOnInit() {
        super.ngOnInit();
        let atendimentoFilter: AtendimentoFilter = new AtendimentoFilter();
        atendimentoFilter.setFilaEsperaOcupacional(new FilaEsperaOcupacionalFilter());
        atendimentoFilter.getFilaEsperaOcupacional().setEmpregado(new EmpregadoFilter());
        atendimentoFilter.getFilaEsperaOcupacional().getEmpregado().setPessoa(new PessoaFilter());
        this.filter.setAtendimento(atendimentoFilter); 
    }
}
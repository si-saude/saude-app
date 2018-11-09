import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Recordatorio } from './../../model/recordatorio';
import { RecordatorioService } from './recordatorio.service';
import { RecordatorioFilter } from './recordatorio.filter';
import { RecordatorioGuard } from './../../guards/guards-child/recordatorio.guard';
import { AtendimentoFilter } from './../atendimento/atendimento.filter';
import { FilaEsperaOcupacionalFilter } from './../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { PessoaFilter } from './../pessoa/pessoa.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-recordatorio',
    templateUrl: './recordatorio.component.html',
    styleUrls: ['./recordatorio.component.css', '../../../assets/css/list-component.css']
} )
export class RecordatorioComponent extends GenericListComponent<Recordatorio, RecordatorioFilter, RecordatorioGuard> {

    constructor( service: RecordatorioService, recordatorioGuard: RecordatorioGuard, router: Router ) {
        super( service, new RecordatorioFilter(), recordatorioGuard, router );
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
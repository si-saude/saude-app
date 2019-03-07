import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AvaliacaoFisica } from '../../model/avaliacao-fisica';
import { AvaliacaoFisicaService } from './../avaliacao-fisica/avaliacao-fisica.service';
import { AvaliacaoFisicaFilter } from './../avaliacao-fisica/avaliacao-fisica.filter';
import { AvaliacaoFisicaGuard } from './../../guards/guards-child/avaliacao-fisica.guard';
import { GenericListComponent } from './../../generics/generic.list.component';
import { Util } from './../../generics/utils/util';
import { EmpregadoFilter } from './../empregado/empregado.filter';
import { FilaEsperaOcupacionalFilter } from './../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { DateFilter } from './../../generics/date.filter';

@Component( {
    selector: 'app-avaliacao-fisica',
    templateUrl: './avaliacao-fisica.component.html',
    styleUrls: ['./avaliacao-fisica.component.css', '../../../assets/css/list-component.css']
} )
export class AvaliacaoFisicaComponent extends GenericListComponent<AvaliacaoFisica, AvaliacaoFisicaFilter, AvaliacaoFisicaGuard> {

    constructor(protected service: AvaliacaoFisicaService, avaliacaoFisicaGuard: AvaliacaoFisicaGuard, router: Router ) {
        super( service, new AvaliacaoFisicaFilter(), avaliacaoFisicaGuard, router );
        
        this.filter.getAtendimento().setFilaEsperaOcupacional(new FilaEsperaOcupacionalFilter());
        this.filter.getAtendimento().getFilaEsperaOcupacional().setHorarioCheckin(new DateFilter())
        this.filter.getAtendimento().getFilaEsperaOcupacional().setEmpregado(new EmpregadoFilter());
    }   
    
    
    downloadRelatorioProaf(id, matricula) {        
        this.service.getRelatorioProafAtendimento(id)
            .then(res => {
                Util.baixar( res, matricula.trim()+".pdf","pdf");
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    setFilter() {
        this.initializerDateFilter(this.filter.getAtendimento().getFilaEsperaOcupacional().getHorarioCheckin());
        super.setFilter();        
    }
}
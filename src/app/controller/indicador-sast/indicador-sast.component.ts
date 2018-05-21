import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component';
import { BooleanFilter } from './../../generics/boolean.filter';
import { IndicadorSast } from './../../model/indicador-sast';
import { IndicadorSastFilter } from './indicador-sast.filter';
import { IndicadorSastGuard } from './../../guards/guards-child/indicador-sast.guard';
import { IndicadorSastService } from './indicador-sast.service';
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 

@Component( { 
    selector: 'app-indicador-sast',
    templateUrl: './indicador-sast.component.html',
    styleUrls: ['./indicador-sast.component.css', '../../../assets/css/list-component.css']
} )
export class IndicadorSastComponent extends GenericListComponent<IndicadorSast, IndicadorSastFilter, IndicadorSastGuard> {
    private obrigatorio: CheckboxUtil;
    private inativo: CheckboxUtil;
    private ausente: CheckboxUtil;

    constructor(indicadorSastService: IndicadorSastService, indicadorSastGuard: IndicadorSastGuard, router: Router) {
        super(indicadorSastService, new IndicadorSastFilter(), indicadorSastGuard, router);
    }
    
    ngAfterViewInit() {
        this.obrigatorio = new CheckboxUtil(document.getElementById("obrigatorio") as HTMLInputElement);
        this.inativo = new CheckboxUtil(document.getElementById("inativo") as HTMLInputElement);
        this.ausente = new CheckboxUtil(document.getElementById("ausenteCalculoInterdisciplinar") as HTMLInputElement);
    }
    
    filtrar() {
        this.filter.getObrigatorio().setValue(this.obrigatorio.getValue());
        this.filter.getInativo().setValue(this.inativo.getValue());
        this.filter.getAusenteCalculoInterdisciplinar().setValue(this.ausente.getValue());
        
        this.setFilter();
    }

}

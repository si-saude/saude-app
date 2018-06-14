    import { Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../global';
import { Diagnostico } from './../../model/diagnostico';
import { DiagnosticoService } from './diagnostico.service';
import { DiagnosticoFilter } from './diagnostico.filter';
import { Eixo } from './../../model/eixo';
import { EixoFilter } from './../eixo/eixo.filter';
import { EixoBuilder } from './../eixo/eixo.builder';
import { DiagnosticoGuard } from './../../guards/guards-child/diagnostico.guard';
import { GenericListComponent } from './../../generics/generic.list.component';
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 

@Component( {
    selector: 'app-diagnostico',
    templateUrl: './diagnostico.component.html',
    styleUrls: ['./diagnostico.component.css', '../../../assets/css/list-component.css']
} )
export class DiagnosticoComponent extends GenericListComponent<Diagnostico, DiagnosticoFilter, DiagnosticoGuard> {
    private inativo: CheckboxUtil;
    
    constructor( private diagnosticoService: DiagnosticoService, diagnosticoGuard: DiagnosticoGuard, router: Router ) {
        super( diagnosticoService, new DiagnosticoFilter(), diagnosticoGuard, router );
    }
    
    ngAfterViewInit() {
        this.inativo = new CheckboxUtil(document.getElementById("inativo") as HTMLInputElement);
    }
    
    filtrar() {
        this.filter.getInativo().setValue(this.inativo.getValue());
        
        this.setFilter();
    }
    
}
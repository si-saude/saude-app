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

@Component( {
    selector: 'app-diagnostico',
    templateUrl: './diagnostico.component.html',
    styleUrls: ['./diagnostico.component.css', '../../../assets/css/list-component.css']
} )
export class DiagnosticoComponent extends GenericListComponent<Diagnostico, DiagnosticoFilter, DiagnosticoGuard> {
    @ViewChild("ina") ina: ElementRef;
    inativo: HTMLInputElement;
    flagInativo: number = 0;
    
    constructor( private diagnosticoService: DiagnosticoService, diagnosticoGuard: DiagnosticoGuard, router: Router ) {
        super( diagnosticoService, new DiagnosticoFilter(), diagnosticoGuard, router );
    }
    
    ngOnInit() {
        this.filter.setEixo(new EixoFilter());
        
        super.ngOnInit();
    }
     
    ngAfterViewInit() {
        this.inativo = this.ina.nativeElement;
        this.inativo.indeterminate = true;
        this.inativo.checked = true;
    }
    
    changeStateInativo() {
        if ( this.inativo.checked == false ) {
            this.flagInativo++;
        }
        if ( this.flagInativo % 2 == 0 ) {
            this.inativo.indeterminate = true;
            this.inativo.checked = true;
            this.flagInativo= 0;
        }
    }
    
    filtrar() {
        if ( this.inativo.indeterminate == true )
            this.filter.getInativo().setValue(0);
        else if ( this.inativo.checked == true )
            this.filter.getInativo().setValue(1);
        else this.filter.getInativo().setValue(2);
        
        super.setFilter();
    }
    
}
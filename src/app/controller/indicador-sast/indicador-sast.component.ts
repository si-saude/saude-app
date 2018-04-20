import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component';
import { BooleanFilter } from './../../generics/boolean.filter';
import { IndicadorSast } from './../../model/indicador-sast';
import { IndicadorSastFilter } from './indicador-sast.filter';
import { IndicadorSastGuard } from './../../guards/guards-child/indicador-sast.guard';
import { IndicadorSastService } from './indicador-sast.service';

@Component( { 
    selector: 'app-indicador-sast',
    templateUrl: './indicador-sast.component.html',
    styleUrls: ['./indicador-sast.component.css', '../../../assets/css/list-component.css']
} )
export class IndicadorSastComponent extends GenericListComponent<IndicadorSast, IndicadorSastFilter, IndicadorSastGuard> {
    @ViewChild( "obrig" ) obrig: ElementRef;
    @ViewChild( "inat" ) inat: ElementRef;
    @ViewChild( "ausen" ) ausen: ElementRef;
    obrigatorio: HTMLInputElement;
    inativo: HTMLInputElement;
    ausente: HTMLInputElement;
    flagObrigatorio: number = 0;
    flagInativo: number = 0;
    flagAusente: number = 0;

    constructor(indicadorSastService: IndicadorSastService, indicadorSastGuard: IndicadorSastGuard, router: Router) {
        super(indicadorSastService, new IndicadorSastFilter(), indicadorSastGuard, router);
    }
    
    ngAfterViewInit() {
        this.obrigatorio = this.obrig.nativeElement;
        this.inativo = this.inat.nativeElement;
        this.ausente = this.ausen.nativeElement;
        
        this.obrigatorio.indeterminate = true;
        this.inativo.indeterminate = true;
        this.ausente.indeterminate = true;
        this.obrigatorio.checked = true;
        this.inativo.checked = true;
        this.ausente.checked = true;
    }
    
    changeStateObrigatorio() {
        if ( this.obrigatorio.checked == false ) {
            this.flagObrigatorio++;
        }
        if ( this.flagObrigatorio% 2 == 0 ) {
            this.obrigatorio.indeterminate = true;
            this.obrigatorio.checked = true;
            this.flagObrigatorio = 0;
        }
    }
    
    changeStateInativo() {
        if ( this.inativo.checked == false ) {
            this.flagInativo++;
        }
        if ( this.flagInativo% 2 == 0 ) {
            this.inativo.indeterminate = true;
            this.inativo.checked = true;
            this.flagInativo = 0;
        }
    }
    
    changeStateAusente() {
        if ( this.ausente.checked == false ) {
            this.flagAusente++;
        }
        if ( this.flagAusente% 2 == 0 ) {
            this.ausente.indeterminate = true;
            this.ausente.checked = true;
            this.flagAusente = 0;
        }
    }
    
    filtrar() {
        this.filter.setObrigatorio(new BooleanFilter());
        this.filter.setInativo(new BooleanFilter());
        this.filter.setAusenteCalculoInterdisciplinar(new BooleanFilter());
        
        if ( this.obrigatorio.indeterminate == true )
            this.filter.getObrigatorio().setValue(0);
        else if ( this.obrigatorio.checked == true )
            this.filter.getObrigatorio().setValue(1);
        else this.filter.getObrigatorio().setValue(2);
        
        if ( this.inativo.indeterminate == true )
            this.filter.getInativo().setValue(0);
        else if ( this.inativo.checked == true )
            this.filter.getInativo().setValue(1);
        else this.filter.getInativo().setValue(2);
        
        if ( this.ausente.indeterminate == true )
            this.filter.getAusenteCalculoInterdisciplinar().setValue(0);
        else if ( this.ausente.checked == true )
            this.filter.getAusenteCalculoInterdisciplinar().setValue(1);
        else this.filter.getAusenteCalculoInterdisciplinar().setValue(2);
        
        this.setFilter();
    }

}

import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component';
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
    obrigatorio: HTMLInputElement;
    inativo: HTMLInputElement;
    flagObrigatorio: number = 0;
    flagInativo: number = 0;

    constructor(indicadorSastService: IndicadorSastService, indicadorSastGuard: IndicadorSastGuard, router: Router) {
        super(indicadorSastService, new IndicadorSastFilter(), indicadorSastGuard, router);
    }
    
    ngAfterViewInit() {
        this.obrigatorio = this.obrig.nativeElement;
        this.inativo = this.inat.nativeElement;
        
        this.obrigatorio.indeterminate = true;
        this.inativo.indeterminate = true;
        this.obrigatorio.checked = true;
        this.inativo.checked = true;
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
    
    filtrar() {
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
        
        this.setFilter();
    }

}

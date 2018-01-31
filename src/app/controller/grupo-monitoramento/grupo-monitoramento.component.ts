import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';

import { GenericListComponent } from './../../generics/generic.list.component';
import { GrupoMonitoramento } from './../../model/grupo-monitoramento';
import { GrupoMonitoramentoFilter } from './grupo-monitoramento.filter';
import { GrupoMonitoramentoGuard } from './../../guards/guards-child/grupo-monitoramento.guard';
import { GrupoMonitoramentoService } from './grupo-monitoramento.service';

@Component({
  selector: 'app-grupo-monitoramento',
  templateUrl: './grupo-monitoramento.component.html',
  styleUrls: ['./grupo-monitoramento.component.css', '../../../assets/css/list-component.css']
})
export class GrupoMonitoramentoComponent extends GenericListComponent<GrupoMonitoramento, GrupoMonitoramentoFilter, GrupoMonitoramentoGuard> {
    @ViewChild("rec") rec: ElementRef;
    @ViewChild("rel") rel: ElementRef;
    @ViewChild("audit") audit: ElementRef;
    recorrente: HTMLInputElement;
    relatorio: HTMLInputElement;
    auditoriaAso: HTMLInputElement;
    flagRecorrente: number = 0;
    flagRelatorio: number = 0;
    flagAuditoriaAso: number = 0;
    
    constructor(grupoMonitoramentoService: GrupoMonitoramentoService, grupoMonitoramentoGuard: GrupoMonitoramentoGuard, router: Router) {
        super(grupoMonitoramentoService, new GrupoMonitoramentoFilter(), grupoMonitoramentoGuard, router);
    }
    
    ngAfterViewInit() {
        this.recorrente = this.rec.nativeElement;
        this.relatorio = this.rel.nativeElement;
        this.auditoriaAso = this.audit.nativeElement;
        
        this.recorrente.indeterminate = true;
        this.relatorio.indeterminate = true;
        this.auditoriaAso.indeterminate = true;
        this.recorrente.checked = true;
        this.relatorio.checked = true;
        this.auditoriaAso.checked = true;
    }
    
    changeStateRecorrente() {
        if ( this.recorrente.checked == false ) {
            this.flagRecorrente++;
        }
        if ( this.flagRecorrente % 2 == 0 ) {
            this.recorrente.indeterminate = true;
            this.recorrente.checked = true;
            this.flagRecorrente = 0;
        }
    }

    changeStateRelatorio() {
        if ( this.relatorio.checked == false ) {
            this.flagRelatorio++;
        }
        if ( this.flagRelatorio % 2 == 0 ) {
            this.relatorio.indeterminate = true;
            this.relatorio.checked = true;
            this.flagRelatorio = 0;
        }
    }
    
    changeStateAuditoriaAso() {
        if ( this.auditoriaAso.checked == false ) {
            this.flagAuditoriaAso++;
        }
        if ( this.flagAuditoriaAso % 2 == 0 ) {
            this.auditoriaAso.indeterminate = true;
            this.auditoriaAso.checked = true;
            this.flagAuditoriaAso = 0;
        }
    }
    
    filtrar() {
        if ( this.relatorio.indeterminate == true )
            this.filter.getRelatorio().setValue(0);
        else if ( this.relatorio.checked == true )
            this.filter.getRelatorio().setValue(1);
        else this.filter.getRelatorio().setValue(2);
        
        if ( this.recorrente.indeterminate == true )
            this.filter.getRecorrente().setValue(0);
        else if ( this.recorrente.checked == true )
            this.filter.getRecorrente().setValue(1);
        else this.filter.getRecorrente().setValue(2);
        
        if ( this.auditoriaAso.indeterminate == true )
            this.filter.getAuditoriaAso().setValue(0);
        else if ( this.auditoriaAso.checked == true )
            this.filter.getAuditoriaAso().setValue(1);
        else this.filter.getAuditoriaAso().setValue(2)
        
        this.setFilter();
    }

}
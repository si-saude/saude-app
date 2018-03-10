import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';
import * as $ from 'jquery';

import { RiscoPotencial } from './../../model/risco-potencial';
import { RiscoPotencialService } from './risco-potencial.service';
import { RiscoPotencialFilter } from './risco-potencial.filter';
import { RiscoPotencialBuilder } from './risco-potencial.builder';
import { RiscoPotencialGuard } from './../../guards/guards-child/risco-potencial.guard';
import { EmpregadoBuilder } from './../empregado/empregado.builder';
import { EquipeBuilder } from './../equipe/equipe.builder';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-risco-potencial',
  templateUrl: './risco-potencial.component.html',
  styleUrls: ['./risco-potencial.component.css', '../../../assets/css/list-component.css']
})
export class RiscoPotencialComponent extends GenericListComponent<RiscoPotencial, RiscoPotencialFilter, RiscoPotencialGuard> {
    riscoPotenciais: Array<RiscoPotencial>;
    riscoPotencialDatas: Array<any>;
    riscoPotencialRPSats: Array<string>;
    empregado;
    equipe;

    constructor( service: RiscoPotencialService, riscoGuard: RiscoPotencialGuard, router: Router ) {
        super( service, new RiscoPotencialFilter(), riscoGuard, router );
        
        service.getEmpregado1().then(res => {
            this.empregado = new EmpregadoBuilder().clone(res.json());
        })
        
        service.getEquipe1().then(res => {
            this.equipe = new EquipeBuilder().clone(res.json());
        })
        
        this.riscoPotenciais = new RiscoPotencialBuilder().cloneList(new Array<RiscoPotencial>());
        this.riscoPotencialDatas = new Array<any>();
        this.riscoPotencialRPSats = new Array<string>();
    }
    
    ngOnInit() {
        super.ngOnInit();
        
        setTimeout(() => {
            if ( this.array != undefined ) {
                this.array = new RiscoPotencialBuilder().cloneList(this.array);
                
                this.array.sort(function( a, b ) {
                    if ( a.getValor() < b.getValor() )
                        return 1;
                    else if ( a.getValor() > b.getValor() )
                        return -1;
                    else return 0;
                })
                
                this.riscoPotenciais = new RiscoPotencialBuilder().cloneList( this.array );
                
                this.riscoPotenciais.forEach(r => {
                    if ( r.getId() > 0 && r.getId() < 3 )
                        r.setStatusRPSat("INACEITAVEL");
                    else if ( r.getId() >= 3 && r.getId() < 6 )
                        r.setStatusRPSat("TOLERAVEL");
                    else if ( r.getId() >= 6 ) r.setStatusRPSat("ACEITAVEL");
                })
                
                setTimeout(() => {
                    this.changeColorStatusRPSat();
                }, 200);
                
                this.parseAndSetDates();
            }
        }, 500);
        
    }
    
    changeColorStatusRPSat() {
        for( let i = 0; i < this.riscoPotenciais.length; i++ ) {
            if ( this.riscoPotenciais[i].getStatusRPSat() != undefined ) {
                if ( this.riscoPotenciais[i].getStatusRPSat().includes("IN") )
                    $(".row-risco"+i).css("background-color", "red");
                else if ( this.riscoPotenciais[i].getStatusRPSat().includes("TOLER") )
                    $(".row-risco"+i).css("background-color", "yellow");
                else $(".row-risco"+i).css("background-color", "green");
            }
        }
    }
    
    parseAndSetDates() {
        for ( let i = 0; i < this.riscoPotenciais.length; i++ ) {
            if ( this.riscoPotenciais[i].getData() != null ) {
                this.riscoPotencialDatas[i] =
                    this.parseDataToObjectDatePicker(
                        this.riscoPotenciais[i].getData() );
            }
        }
    }

}

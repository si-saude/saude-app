import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

import { RiscoPotencial } from './../../model/risco-potencial';
import { RiscoPotencialService } from './risco-potencial.service';
import { RiscoPotencialFilter } from './risco-potencial.filter';
import { RiscoPotencialBuilder } from './risco-potencial.builder';
import { RiscoPotencialGuard } from './../../guards/guards-child/risco-potencial.guard';
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

    constructor( service: RiscoPotencialService, riscoGuard: RiscoPotencialGuard, router: Router ) {
        super( service, new RiscoPotencialFilter(), riscoGuard, router );
        
        this.riscoPotenciais = new RiscoPotencialBuilder().cloneList(new Array<RiscoPotencial>());
        this.riscoPotencialDatas = new Array<any>();
        this.riscoPotencialRPSats = new Array<string>();
    }
    
    ngOnInit() {
        super.ngOnInit();
        
        setTimeout(() => {
            this.array.sort(function( a, b ) {
                if ( a.getValor() > b.getValor() )
                    return 1;
                else if ( a.getValor() < b.getValor() )
                    return -1;
                else return 0;
            })
            
            this.riscoPotenciais = new RiscoPotencialBuilder().cloneList( this.array );
            this.parseAndSetDates();
        }, 500);
        
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

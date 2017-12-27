import { Component, ViewChild, ElementRef } from '@angular/core';

import { Servico } from './../../model/servico';
import { ServicoService } from './servico.service';
import { ServicoFilter } from './servico.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { ServicoGuard } from './../../guards/guards-child/servico.guard';

@Component( {
    selector: 'app-servico',
    templateUrl: './servico.component.html',
    styleUrls: ['./servico.component.css', '../../../assets/css/list-component.css']
} )
export class ServicoComponent extends GenericListComponent<Servico, ServicoFilter, ServicoGuard> {
    @ViewChild( "pub" ) pub: ElementRef;
    publico: HTMLInputElement;
    flagPublico: number = 0;

    constructor( service: ServicoService, servicoGuard: ServicoGuard ) {
        super( service, new ServicoFilter(), servicoGuard );
    }
    
    ngAfterViewInit() {
        this.publico = this.pub.nativeElement;
    }
    
    changeStatePublico() {
        if ( this.publico.checked == false ) {
            this.flagPublico++;
        }
        if ( this.flagPublico % 2 == 0 ) {
            this.publico.indeterminate = true;
            this.publico.checked = true;
            this.flagPublico = 0;
        }
    }

    filtrar() {
        if ( this.publico.indeterminate == true )
            this.filter.getPublico().setValue(0);
        else if ( this.publico.checked == true )
            this.filter.getPublico().setValue(1);
        else this.filter.getPublico().setValue(2);
        
        this.setFilter();
    }

}
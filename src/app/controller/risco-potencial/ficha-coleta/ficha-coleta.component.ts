import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { FichaColeta } from './../../../model/ficha-coleta';
import { FichaColetaBuilder } from './../../ficha-coleta/ficha-coleta.builder';
import { FilaEsperaOcupacionalFilter } from './../../fila-espera-ocupacional/fila-espera-ocupacional.filter';
import { FilaEsperaOcupacionalService } from './../../fila-espera-ocupacional/fila-espera-ocupacional.service';
import { RiscoPotencialFilter } from './../../risco-potencial/risco-potencial.filter';

@Component( {
    selector: 'app-risco-potencial-ficha-coleta',
    templateUrl: './ficha-coleta.html',
    styleUrls: ['./ficha-coleta.css', './../../../../assets/css/form-component.css']
} )
export class FichaColetaComponent extends GenericFormComponent implements OnInit {
    private fichaColeta: FichaColeta;
    private idEquipeProfissional: number;

    constructor( private route: ActivatedRoute,
            private filaEsperaOcupacionalService: FilaEsperaOcupacionalService,
            router: Router) {
            super( filaEsperaOcupacionalService, router );
        
            this.goTo = "risco-potencial";
            
            this.fichaColeta = new FichaColetaBuilder().initialize(new FichaColeta());
            this.idEquipeProfissional = -1;
    }

    ngOnInit() {
        let component = this;
        component.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    component.showPreload = true;

                    let filaFilter: FilaEsperaOcupacionalFilter = new FilaEsperaOcupacionalFilter();
                    filaFilter.setRiscoPotencial( new RiscoPotencialFilter() );
                    filaFilter.getRiscoPotencial().setId( id );
                    
                    component.filaEsperaOcupacionalService.listAll( filaFilter )
                        .then( res => {
                            component.showPreload = false;
                            component.fichaColeta = new FichaColetaBuilder().clone( res.json().list[0]["fichaColeta"] );
                        } )
                        .catch( error => {
                            component.catchConfiguration( error );
                        } )
                }
            } );
    }
    
    ngOnDestroy() {
        if ( this.inscricao != undefined ) 
            this.inscricao.unsubscribe();
    }
}

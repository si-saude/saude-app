import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Feriado } from './../../../model/feriado';
import { FeriadoService } from './../feriado.service';
import { FeriadoFilter } from './../feriado.filter';
import { FeriadoBuilder } from './../feriado.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-feriado-form-detail',
    templateUrl: './feriado-form-detail.html',
    styleUrls: ['./feriado-form.css', './../../../../assets/css/form-component.css']
} )
export class FeriadoFormDetailComponent extends GenericFormComponent implements OnInit {
    feriado: Feriado;
    data: any;
    
    feriadoFilter: FeriadoFilter = new FeriadoFilter();
    
    constructor( private route: ActivatedRoute,
        private feriadoService: FeriadoService) { 
        super(feriadoService);
        this.goTo = "feriado";
        
        this.feriado = new FeriadoBuilder().initialize(this.feriado);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.feriadoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.feriado = new FeriadoBuilder().clone(res.json());
                        this.parseAndSetDates();
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
            
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
    parseAndSetDates() {
        if ( this.feriado.getData() !== null &&
            this.feriado.getData() !== undefined ) {
            this.data = this.parseDataToObjectDatePicker( this.feriado.getData() );
        }
    }
    
}

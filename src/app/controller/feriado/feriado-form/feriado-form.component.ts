import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Feriado } from './../../../model/feriado';
import { FeriadoService } from './../feriado.service';
import { FeriadoFilter } from './../feriado.filter';
import { FeriadoBuilder } from './../feriado.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-feriado-form',
    templateUrl: './feriado-form.html',
    styleUrls: ['./feriado-form.css', './../../../../assets/css/form-component.css']
} )
export class FeriadoFormComponent extends GenericFormComponent implements OnInit {
    feriado: Feriado;
    data: any; 

    constructor( private route: ActivatedRoute,
        private feriadoService: FeriadoService,
        router: Router) { 
        super(feriadoService, router);
        this.goTo = "feriado";
        
        this.feriado = new FeriadoBuilder().initialize(this.feriado);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
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
                }
            } );
            
    }
    
    save() {
        this.verifyAndSetDates();
        super.save(new FeriadoBuilder().clone(this.feriado));
    }   

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
    verifyAndSetDates() {
        if ( this.data !== null &&
            this.data !== undefined )
            this.feriado.setData(
                this.parseDatePickerToDate( this.data ) );
    }

    parseAndSetDates() {
        if ( this.feriado.getData() !== null &&
            this.feriado.getData() !== undefined ) {
            this.data = this.parseDataToObjectDatePicker( this.feriado.getData() );
        }
    }
    
}
